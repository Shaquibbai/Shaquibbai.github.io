import React, { useState, useEffect, useRef } from 'react';
import Spacecraft from './Spacecraft';
import Astronaut from './Astronaut';
import TetherCanvas from './TetherCanvas';
import './spaceJourney.css';

export default function SpaceJourney() {
  const [rocketPos, setRocketPos] = useState({ x: 0, y: 0 });
  const [astroPos, setAstroPos] = useState({ x: 0, y: 0 });
  const [astroRotation, setAstroRotation] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Position state refs for requestAnimationFrame loop without re-render lag
  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    rocketX: 0,
    rocketY: 0,
    lastVy: 0
  });

  const handleReturnToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    let animFrameId;

    const updateJourney = () => {
      const anchorEl = document.getElementById('hero-spacecraft-anchor');
      
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        // Rocket tether attachment point (rear physical hull of spacecraft, away from flame)
        const rx = rect.left + rect.width * 0.46;
        const ry = rect.top + rect.height * 0.58;

        stateRef.current.rocketX = rx;
        stateRef.current.rocketY = ry;
        setRocketPos({ x: rx, y: ry });

        const scrollY = window.scrollY;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let tX, tY;

        if (scrollY < 50) {
          // At top of page: float 95px to the right of rocket for a loose cubic bezier tether curve
          tX = rx + 95;
          tY = ry + 80;
        } else {
          // As user scrolls down: float gracefully along the right side of the screen
          const driftX = Math.sin((scrollY + Date.now() * 0.05) * 0.002) * 14;
          const driftY = Math.cos((scrollY + Date.now() * 0.05) * 0.0015) * 12;

          tX = Math.min(vw - 80, Math.max(60, rx + 75 + driftX));
          tY = Math.min(vh - 120, Math.max(90, vh * 0.38 + driftY));
        }

        stateRef.current.targetX = tX;
        stateRef.current.targetY = tY;

        // First frame initialization
        if (!isReady && rx > 0) {
          stateRef.current.currentX = tX;
          stateRef.current.currentY = tY;
          setIsReady(true);
        }
      }

      if (prefersReducedMotion || isTouchDevice) {
        // Static positioning for reduced motion / mobile
        stateRef.current.currentX = stateRef.current.targetX;
        stateRef.current.currentY = stateRef.current.targetY;
        setAstroPos({ x: stateRef.current.targetX, y: stateRef.current.targetY });
        setAstroRotation(0);
      } else {
        // Physical Lerp Interpolation for inertia & lag
        const lerpFactor = 0.055;
        const dx = stateRef.current.targetX - stateRef.current.currentX;
        const dy = stateRef.current.targetY - stateRef.current.currentY;

        stateRef.current.currentX += dx * lerpFactor;
        stateRef.current.currentY += dy * lerpFactor;

        // Calculate rotation tilt based on vertical movement velocity
        const vy = dy * lerpFactor;
        const targetRot = Math.min(Math.max(vy * 0.25, -12), 12);
        const smoothRot = stateRef.current.lastVy * 0.8 + targetRot * 0.2;
        stateRef.current.lastVy = smoothRot;

        setAstroPos({ x: stateRef.current.currentX, y: stateRef.current.currentY });
        setAstroRotation(smoothRot);
      }

      animFrameId = requestAnimationFrame(updateJourney);
    };

    animFrameId = requestAnimationFrame(updateJourney);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isReady]);

  // Harness attachment point on astronaut chest/belt ring
  const astroHarnessPos = {
    x: astroPos.x + 21,
    y: astroPos.y + 30
  };

  return (
    <>
      {/* Dynamic Cable / Safety Tether */}
      <TetherCanvas
        startPos={rocketPos}
        endPos={astroHarnessPos}
        isVisible={isReady}
      />

      {/* Floating Interactive Astronaut */}
      {isReady && (
        <div
          className="astronaut-container"
          style={{
            transform: `translate3d(${astroPos.x}px, ${astroPos.y}px, 0)`
          }}
        >
          <div className="astronaut-inner-float">
            <Astronaut rotation={astroRotation} onClick={handleReturnToTop} />
          </div>
        </div>
      )}
    </>
  );
}
