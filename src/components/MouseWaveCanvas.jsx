import React, { useEffect, useRef } from 'react';

export default function MouseWaveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check pointer and motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = Math.max(1, window.innerWidth || 1024));
    let height = (canvas.height = Math.max(1, window.innerHeight || 768));

    let hasMoved = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevX = 0;
    let prevY = 0;
    let activeGlowAlpha = 0;

    let particles = [];
    let mistWisps = [];
    let stars = [];
    let animFrameId = null;

    const handleResize = () => {
      width = canvas.width = Math.max(1, window.innerWidth || 1024);
      height = canvas.height = Math.max(1, window.innerHeight || 768);
    };

    const handleMouseMove = (e) => {
      if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
        const mx = Math.max(0, Math.min(width, e.clientX));
        const my = Math.max(0, Math.min(height, e.clientY));

        if (!hasMoved) {
          hasMoved = true;
          targetX = currentX = prevX = mx;
          targetY = currentY = prevY = my;
        } else {
          targetX = mx;
          targetY = my;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Safe helper function to create radial gradients without throwing DOMExceptions
    const createSafeGradient = (x, y, rInner, rOuter, colorStops) => {
      const cx = isFinite(x) ? x : width / 2;
      const cy = isFinite(y) ? y : height / 2;
      const r0 = Math.max(0, isFinite(rInner) ? rInner : 0);
      const r1 = Math.max(0.1, isFinite(rOuter) ? rOuter : 10);

      try {
        const grad = ctx.createRadialGradient(cx, cy, r0, cx, cy, r1);
        colorStops.forEach(([offset, color]) => {
          const safeOffset = Math.max(0, Math.min(1, isFinite(offset) ? offset : 0));
          grad.addColorStop(safeOffset, color);
        });
        return grad;
      } catch (err) {
        return null;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Maintain approx 20-30 flickering white stars in deep space background
      if (stars.length < 30 && Math.random() < 0.3) {
        const rand = Math.random();
        const isProminent = rand < 0.10;   // 10% larger/brighter accent stars
        const isMedium = rand < 0.40;      // 30% medium-sized stars

        // Size categories: Small (0.8-1.4px), Medium (1.5-2.4px), Prominent (2.5-3.8px)
        const radius = isProminent
          ? 2.5 + Math.random() * 1.3
          : isMedium
          ? 1.5 + Math.random() * 0.9
          : 0.8 + Math.random() * 0.6;

        // Opacity & lifetime (~0.8s - 1.8s)
        const maxLife = 50 + Math.floor(Math.random() * 60);
        const peakAlpha = isProminent
          ? 0.35 + Math.random() * 0.15
          : isMedium
          ? 0.18 + Math.random() * 0.12
          : 0.08 + Math.random() * 0.08;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          life: 0,
          maxLife,
          peakAlpha,
          radius,
          isProminent
        });
      }

      // Render flickering white background stars (behind mouse wave & cosmic mist)
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.life++;
        if (s.life >= s.maxLife) {
          stars.splice(i, 1);
          continue;
        }

        const progress = s.life / s.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * s.peakAlpha;
        const glowMultiplier = s.isProminent ? 3.2 : 2.2;

        const starGrad = createSafeGradient(s.x, s.y, 0, s.radius * glowMultiplier, [
          [0, `rgba(255, 255, 255, ${currentAlpha * 0.95})`],
          [0.35, `rgba(242, 245, 252, ${currentAlpha * 0.3})`],
          [1, 'rgba(0, 0, 0, 0)']
        ]);

        if (starGrad) {
          ctx.fillStyle = starGrad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * glowMultiplier, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Do not render mouse light, wave particles, or cosmic mist until initial mouse movement occurs
      if (!hasMoved) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      // Lerp current position toward target for smooth inertia
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const dx = currentX - prevX;
      const dy = currentY - prevY;
      const dist = Math.hypot(dx, dy);

      // Ramping activeGlowAlpha up when mouse is moving, smoothly decaying to 0 when mouse stops
      if (isFinite(dist) && dist > 1.2) {
        activeGlowAlpha = Math.min(1.0, activeGlowAlpha + 0.18);

        // Spawn directional wave particles and asymmetric cosmic mist wisps when mouse is moving
        particles.push({
          x: currentX,
          y: currentY,
          vx: -dx * 0.15,
          vy: -dy * 0.15,
          alpha: 0.35,
          radius: Math.max(8, Math.min(60, 35 + dist * 1.5))
        });

        // Spawn soft asymmetric cosmic nebula dust wisps
        if (Math.random() < 0.55) {
          const angle = Math.random() * Math.PI * 2;
          const offsetDist = Math.random() * 28;
          mistWisps.push({
            x: currentX + Math.cos(angle) * offsetDist,
            y: currentY + Math.sin(angle) * offsetDist,
            vx: -dx * 0.08 + (Math.random() - 0.5) * 0.35,
            vy: -dy * 0.08 + (Math.random() - 0.5) * 0.35,
            radius: 35 + Math.random() * 45,
            scaleGrowth: 1.012 + Math.random() * 0.008,
            life: 0,
            maxLife: 40 + Math.floor(Math.random() * 35),
            peakAlpha: 0.07 + Math.random() * 0.06,
            hueType: Math.random()
          });
        }
      } else {
        // Smoothly fade active cursor light glow to 0 when stationary
        activeGlowAlpha = Math.max(0, activeGlowAlpha * 0.86);
      }

      prevX = currentX;
      prevY = currentY;

      // Update & render organic cosmic mist wisps (interstellar dust)
      for (let i = mistWisps.length - 1; i >= 0; i--) {
        const w = mistWisps[i];
        w.life++;
        if (w.life >= w.maxLife) {
          mistWisps.splice(i, 1);
          continue;
        }

        w.x += w.vx;
        w.y += w.vy;
        w.vx *= 0.96; // Soft friction drift
        w.vy *= 0.96;
        w.radius *= w.scaleGrowth; // Soft expanding mist

        const progress = w.life / w.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * w.peakAlpha;

        // Extremely low-opacity space tones: muted reddish-purple, dark burgundy, faint violet
        let colorCore = `rgba(168, 85, 247, ${currentAlpha * 0.35})`;
        let colorMid = `rgba(136, 19, 75, ${currentAlpha * 0.15})`;
        if (w.hueType < 0.35) {
          colorCore = `rgba(185, 28, 28, ${currentAlpha * 0.30})`;
          colorMid = `rgba(120, 10, 25, ${currentAlpha * 0.12})`;
        } else if (w.hueType > 0.75) {
          colorCore = `rgba(147, 51, 234, ${currentAlpha * 0.30})`;
          colorMid = `rgba(88, 28, 135, ${currentAlpha * 0.12})`;
        }

        const mistGrad = createSafeGradient(w.x, w.y, 0, w.radius, [
          [0, colorCore],
          [0.45, colorMid],
          [1, 'rgba(0, 0, 0, 0)']
        ]);

        if (mistGrad) {
          ctx.fillStyle = mistGrad;
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update & render wave trail particles (soft pale core with faint space-purple cosmic trail)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Sanity validation: remove corrupted particles
        if (
          !p ||
          !isFinite(p.x) ||
          !isFinite(p.y) ||
          !isFinite(p.radius) ||
          p.radius <= 0 ||
          !isFinite(p.alpha) ||
          p.alpha <= 0.01
        ) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.85; // Fast decay so trail settles quickly when movement stops
        p.radius *= 1.02;

        const safeAlpha = Math.max(0, Math.min(1, p.alpha));
        const safeRadius = Math.max(1, Math.min(110, p.radius));

        const grad = createSafeGradient(p.x, p.y, 0, safeRadius, [
          [0, `rgba(243, 232, 255, ${safeAlpha * 0.35})`],
          [0.45, `rgba(147, 51, 234, ${safeAlpha * 0.12})`],
          [1, 'rgba(0, 0, 0, 0)']
        ]);

        if (grad) {
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, safeRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render main moving cursor point & glow ONLY while activeGlowAlpha > 0.005 (fades to 0 when stationary)
      if (activeGlowAlpha > 0.005) {
        const mainRadius = 65;
        const mainGrad = createSafeGradient(currentX, currentY, 0, mainRadius, [
          [0, `rgba(243, 232, 255, ${0.32 * activeGlowAlpha})`],
          [0.35, `rgba(168, 85, 247, ${0.10 * activeGlowAlpha})`],
          [0.75, `rgba(126, 34, 206, ${0.025 * activeGlowAlpha})`],
          [1, 'rgba(0, 0, 0, 0)']
        ]);

        if (mainGrad) {
          ctx.fillStyle = mainGrad;
          ctx.beginPath();
          ctx.arc(currentX, currentY, mainRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        width: '100vw',
        height: '100vh'
      }}
    />
  );
}
