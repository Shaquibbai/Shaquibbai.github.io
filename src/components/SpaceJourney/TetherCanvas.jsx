import React, { useState, useEffect, useRef } from 'react';

export default function TetherCanvas({ startPos, endPos, isVisible = true }) {
  const [disp, setDisp] = useState({ x: 0, y: 0 });
  const targetDispRef = useRef({ x: 0, y: 0 });
  const currentDispRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    let animFrameId;

    const updatePhysics = () => {
      // Smooth lerp for springy cable deformation
      const lerp = 0.12;
      currentDispRef.current.x += (targetDispRef.current.x - currentDispRef.current.x) * lerp;
      currentDispRef.current.y += (targetDispRef.current.y - currentDispRef.current.y) * lerp;

      setDisp({ x: currentDispRef.current.x, y: currentDispRef.current.y });
      animFrameId = requestAnimationFrame(updatePhysics);
    };

    animFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  if (!isVisible || !startPos || !endPos) return null;

  const x1 = startPos.x;
  const y1 = startPos.y;
  const x2 = endPos.x;
  const y2 = endPos.y;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;

  // Perpendicular normal vector for zero-g sideways cable sag
  const nx = -dy / dist;
  const ny = dx / dist;

  // Zero-g loose cable bow factor
  const sagAmount = Math.min(Math.max(dist * 0.26, 22), 65);

  // Dynamic Cubic Bezier control points
  const baseC1x = x1 + dx * 0.35 + nx * sagAmount;
  const baseC1y = y1 + dy * 0.35 + ny * sagAmount + 12;

  const baseC2x = x1 + dx * 0.70 + nx * (sagAmount * 0.85);
  const baseC2y = y1 + dy * 0.70 + ny * (sagAmount * 0.85) + 18;

  // Apply smooth mouse hover displacement
  const c1x = baseC1x + disp.x;
  const c1y = baseC1y + disp.y;
  const c2x = baseC2x + disp.x * 0.8;
  const c2y = baseC2y + disp.y * 0.8;

  // Cubic Bezier Path: M x1 y1 C c1x c1y, c2x c2y, x2 y2
  const pathD = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const handlePointerMove = (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    // Push direction vector from mouse to cable midpoint
    const pushX = midX - mx;
    const pushY = midY - my;
    const pDist = Math.hypot(pushX, pushY) || 1;

    // Subtle displacement force (max 32px push)
    const maxPush = 32;
    const force = Math.min(maxPush, (maxPush * 75) / (pDist + 15));

    targetDispRef.current = {
      x: (pushX / pDist) * force,
      y: (pushY / pDist) * force
    };
  };

  const handlePointerLeave = () => {
    targetDispRef.current = { x: 0, y: 0 };
  };

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99,
        overflow: 'visible'
      }}
    >
      <defs>
        {/* Glow filter for soft tether lighting */}
        <filter id="tetherGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="tetherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#f3f4f6" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#f3f4f6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Invisible thick hit stroke area for mouse hover interaction */}
      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth="24"
        strokeLinecap="round"
        style={{ pointerEvents: 'stroke' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />

      {/* Background soft glow path */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(225, 29, 72, 0.2)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pointerEvents: 'none' }}
      />

      {/* Main visible cubic bezier tether cable */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#tetherGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        filter="url(#tetherGlow)"
        style={{ pointerEvents: 'none' }}
      />
    </svg>
  );
}
