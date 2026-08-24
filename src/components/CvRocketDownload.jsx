import React, { useState, useRef, useEffect } from 'react';
import rocketSprite from '../assets/rocket-sprite.png';
import cvFile from '../assets/cv/Shaquib_Wasif_CV.pdf';

export default function CvRocketDownload() {
  const [isAnimating, setIsAnimating] = useState(false);
  const rocketRef = useRef(null);
  const animFrameRef = useRef(null);

  // Direct Vite-compatible PDF download handler
  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Shaquib_Wasif_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (isAnimating) return;

    // Reduced Motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      triggerDownload();
      return;
    }

    setIsAnimating(true);
  };

  useEffect(() => {
    if (!isAnimating) return;

    let startTime = null;
    const FLIGHT_DURATION = 950;  // 0ms -> 950ms: curved flight
    const SETTLE_DURATION = 150;  // 950ms -> 1100ms: settle at destination
    const FADE_DURATION = 300;    // 1100ms -> 1400ms: smooth fade out to 0 opacity
    const TOTAL_DURATION = FLIGHT_DURATION + SETTLE_DURATION + FADE_DURATION; // 1400ms

    // Bézier curve points (relative to CV button)
    const P0 = { x: 85, y: 65 };   // Start position (bottom-right offset)
    const P1 = { x: 35, y: -25 };  // Arc control point for smooth turning curve
    const P2 = { x: 0, y: -2 };    // Destination near CV button

    let currentAngle = -135;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (!rocketRef.current) return;

      if (elapsed < TOTAL_DURATION) {
        let x, y, opacity = 1;

        if (elapsed <= FLIGHT_DURATION) {
          // Flight Phase (0 -> 950ms)
          const rawT = elapsed / FLIGHT_DURATION;
          // Smooth cubic ease-out curve
          const t = 1 - Math.pow(1 - rawT, 2.5);

          // Position on Quadratic Bézier curve
          const oneMinusT = 1 - t;
          x = oneMinusT * oneMinusT * P0.x + 2 * oneMinusT * t * P1.x + t * t * P2.x;
          y = oneMinusT * oneMinusT * P0.y + 2 * oneMinusT * t * P1.y + t * t * P2.y;

          // Velocity derivative vector for natural tangent angle
          const dx = 2 * oneMinusT * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
          const dy = 2 * oneMinusT * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);

          // Exact continuous tangent rotation angle
          const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
          // Continuous lerp interpolation eliminating lag/jitter
          currentAngle += (targetAngle - currentAngle) * 0.18;

          opacity = Math.min(1, elapsed / 150); // Fade in over first 150ms
        } else if (elapsed <= FLIGHT_DURATION + SETTLE_DURATION) {
          // Settle Phase (950ms -> 1100ms)
          x = P2.x;
          y = P2.y;
          currentAngle += (0 - currentAngle) * 0.12; // Gently align to 0deg
          opacity = 1;
        } else {
          // Fade Out Phase (1100ms -> 1400ms)
          x = P2.x;
          y = P2.y;
          const fadeProgress = (elapsed - (FLIGHT_DURATION + SETTLE_DURATION)) / FADE_DURATION;
          opacity = Math.max(0, 1 - fadeProgress);
        }

        // Apply GPU accelerated transform & opacity
        rocketRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${currentAngle}deg) scale(0.9)`;
        rocketRef.current.style.opacity = opacity;

        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation COMPLETELY Finished: opacity = 0, rocket fully disappeared
        rocketRef.current.style.opacity = 0;
        setIsAnimating(false);

        // Pause 80ms AFTER complete disappearance, THEN trigger CV download!
        setTimeout(() => {
          triggerDownload();
        }, 80);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAnimating]);

  return (
    <div className="cv-rocket-download-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
      {/* Subtle Hidden CV Destination Button */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isAnimating}
        aria-label="Download Shaquib Wasif CV"
        title="Click to launch CV rocket delivery"
        className="font-mono cv-secret-btn"
        style={{
          background: 'rgba(13, 6, 9, 0.75)',
          border: '1px solid rgba(225, 29, 72, 0.35)',
          color: 'var(--text-secondary)',
          fontSize: '0.78rem',
          padding: '0.28rem 0.75rem',
          borderRadius: '4px',
          cursor: isAnimating ? 'wait' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          outline: 'none',
          transition: 'all 0.25s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          letterSpacing: '0.05em'
        }}
      >
        <span style={{ color: 'var(--accent-crimson)', fontSize: '0.65rem' }}>◆</span>
        <span>CV / RESUME</span>
      </button>

      {/* Dedicated CV Delivery Rocket (Math-interpolated smooth turn) */}
      {isAnimating && (
        <div
          ref={rocketRef}
          className="cv-mini-rocket-anim"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            pointerEvents: 'none',
            zIndex: 40,
            willChange: 'transform, opacity',
            opacity: 0
          }}
        >
          <img
            src={rocketSprite}
            alt=""
            style={{
              width: '45px',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 12px rgba(225, 29, 72, 0.7))'
            }}
          />
        </div>
      )}
    </div>
  );
}
