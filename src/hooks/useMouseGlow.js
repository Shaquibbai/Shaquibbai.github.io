import { useEffect } from 'react';

export function useMouseGlow() {
  useEffect(() => {
    // Check reduced motion & pointer capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animFrameId = null;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateGlow = () => {
      // Lerp tracking for smooth light movement attached behind the cursor
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      document.body.style.setProperty('--mouse-x', `${currentX}px`);
      document.body.style.setProperty('--mouse-y', `${currentY}px`);

      animFrameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);
}
