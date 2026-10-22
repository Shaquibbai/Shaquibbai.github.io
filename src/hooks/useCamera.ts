import { useState, useEffect, useCallback, useRef } from 'react';
import { clamp, f } from '../utils/svgHelpers';

const HOUSEB = { x: 520, y: 20, w: 830, h: 880 };

export interface Dims {
  a: number;
  w: number;
  h: number;
  max: number;
}

export function calculateDims(): Dims {
  const w = window.innerWidth || 1200;
  const h = window.innerHeight || 800;
  const a = w / h;
  const vw = clamp(a * 920, 430, 1600);
  return {
    a,
    w: vw,
    h: vw / a,
    max: Math.max(0, 1600 - vw)
  };
}

export function calculateOutsideViewBox(): string {
  const wWin = window.innerWidth || 1200;
  const hWin = window.innerHeight || 800;
  const a = wWin / hWin;
  let w: number;
  let h: number;
  let x: number;
  let y: number;

  if (a >= 1.05) {
    h = 1090;
    w = h * a;
    x = HOUSEB.x + HOUSEB.w * 0.5 - w * 0.62;
    y = HOUSEB.y - 40;
  } else {
    w = 820;
    h = w / a;
    x = 905 - w * 0.5;
    y = 905 - h * 0.95;
  }

  return [f(x), f(y), f(w), f(h)].join(' ');
}

export function useCamera() {
  const [dims, setDims] = useState<Dims>(calculateDims);
  const [outsideViewBox, setOutsideViewBox] = useState<string>(calculateOutsideViewBox);
  const [camX, setCamX] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const animRef = useRef<number | null>(null);

  const updateViewports = useCallback(() => {
    const d = calculateDims();
    setDims(d);
    setOutsideViewBox(calculateOutsideViewBox());
    setCamX((prev) => {
      const updated: Record<number, number> = { ...prev };
      for (const k of [1, 2, 3, 4]) {
        updated[k] = clamp(prev[k] ?? 0, 0, d.max);
      }
      return updated;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateViewports);
    return () => window.removeEventListener('resize', updateViewports);
  }, [updateViewports]);

  const panTo = useCallback((floorNum: number, targetX: number, ms = 420, isReducedMotion = false) => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    const d = calculateDims();
    const clampedTarget = clamp(targetX, 0, d.max);

    setCamX((prev) => {
      const from = prev[floorNum] || 0;
      if (isReducedMotion || ms === 0 || Math.abs(clampedTarget - from) < 2) {
        return { ...prev, [floorNum]: clampedTarget };
      }

      const t0 = performance.now();
      const step = () => {
        const now = performance.now();
        const t = clamp((now - t0) / ms, 0, 1);
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const current = from + (clampedTarget - from) * e;

        setCamX((p) => ({ ...p, [floorNum]: current }));

        if (t < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          animRef.current = null;
        }
      };

      animRef.current = requestAnimationFrame(step);
      return prev;
    });
  }, []);

  const centreOn = useCallback((floorNum: number, targetCx: number, ms = 380, isReducedMotion = false) => {
    const d = calculateDims();
    panTo(floorNum, targetCx - d.w / 2, ms, isReducedMotion);
  }, [panTo]);

  const setDirectCamX = useCallback((floorNum: number, newX: number) => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    const d = calculateDims();
    const clamped = clamp(newX, 0, d.max);
    setCamX((prev) => ({ ...prev, [floorNum]: clamped }));
  }, []);

  const getFloorViewBox = useCallback((floorNum: number): string => {
    const x = camX[floorNum] || 0;
    return [f(x), f(430 - dims.h / 2), f(dims.w), f(dims.h)].join(' ');
  }, [camX, dims]);

  return {
    dims,
    outsideViewBox,
    camX,
    panTo,
    centreOn,
    setDirectCamX,
    getFloorViewBox
  };
}
