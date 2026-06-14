"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export interface UseMousePositionOptions {
  /** throttle updates to one per animation frame (default: true) */
  throttle?: boolean;
}

/**
 * Performant mouse-position hook.
 * - Updates are throttled to the next animation frame to avoid React re-render storms.
 * - Uses passive listeners.
 * - Cleans up all pending rAFs on unmount.
 */
export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { throttle = true } = options;
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<MousePosition | null>(null);

  const flush = useCallback(() => {
    if (pendingRef.current) {
      setPosition(pendingRef.current);
      pendingRef.current = null;
    }
    rafRef.current = null;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const next = { x: e.clientX, y: e.clientY };

      if (!throttle) {
        setPosition(next);
        return;
      }

      pendingRef.current = next;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [throttle, flush]);

  return position;
}

export default useMousePosition;
