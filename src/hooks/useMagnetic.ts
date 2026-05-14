import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useEffect, useCallback, useMemo, type RefObject } from 'react';

interface MagneticOptions {
  /** How strongly the element is pulled toward the cursor. Default 0.15. */
  strength?: number;
  /** Maximum distance (px) from the element center where the effect activates. Default 150. */
  radius?: number;
}

/**
 * Applies magnetic hover physics to a DOM element.
 *
 * When the cursor moves near the element's center, the element is subtly
 * pulled toward it via Framer Motion spring physics. On mouse leave, it
 * springs back to its original position. Respects `prefers-reduced-motion`.
 *
 * Usage:
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const magnetic = useMagnetic(ref, { strength: 0.15, radius: 150 });
 * return <motion.div ref={ref} style={magnetic}>...</motion.div>;
 * ```
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {},
): { x: MotionValue<number> | number; y: MotionValue<number> | number } {
  const { strength = 0.15, radius = 150 } = options;

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const springX = useSpring(motionX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(motionY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance > radius) {
        motionX.set(0);
        motionY.set(0);
        return;
      }

      const offsetX = distX * strength;
      const offsetY = distY * strength;

      const MAX_PULL = 20;
      const clampedX = Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetX));
      const clampedY = Math.max(-MAX_PULL, Math.min(MAX_PULL, offsetY));

      motionX.set(clampedX);
      motionY.set(clampedY);
    },
    [ref, strength, radius, motionX, motionY, reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion) return;
    motionX.set(0);
    motionY.set(0);
  }, [motionX, motionY, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave, reducedMotion]);

  if (reducedMotion) {
    return { x: 0, y: 0 };
  }

  return { x: springX, y: springY };
}
