"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from "react";
import {
  useScroll,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

export interface ScrollProgressState {
  scrollY: number;
  scrollYProgress: number;
  smoothProgress: number;
}

export interface UseScrollProgressOptions {
  /** Disable spring smoothing for raw values. */
  spring?: boolean;
  stiffness?: number;
  damping?: number;
  restDelta?: number;
  /** Throttle state updates in milliseconds. */
  throttleMs?: number;
}

/**
 * Global scroll progress with optional spring smoothing and throttled React state.
 * Returns both raw MotionValues (for direct binding) and a numeric state snapshot.
 */
export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): ScrollProgressState & {
  scrollYMotion: MotionValue<number>;
  scrollYProgressMotion: MotionValue<number>;
  smoothProgressMotion: MotionValue<number>;
} {
  const {
    spring = true,
    stiffness = 120,
    damping = 25,
    restDelta = 0.001,
    throttleMs = 16,
  } = options;

  const { scrollY, scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta,
  });
  const smoothProgress = spring ? springProgress : scrollYProgress;

  const [state, setState] = useState<ScrollProgressState>({
    scrollY: 0,
    scrollYProgress: 0,
    smoothProgress: 0,
  });

  const lastUpdate = useRef(0);

  const update = useCallback(
    (latest: number, y: number) => {
      const now = performance.now();
      if (now - lastUpdate.current >= throttleMs) {
        lastUpdate.current = now;
        setState({
          scrollY: y,
          scrollYProgress: latest,
          smoothProgress: smoothProgress.get(),
        });
      }
    },
    [throttleMs, smoothProgress]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    update(latest, scrollY.get());
  });

  return {
    ...state,
    scrollYMotion: scrollY,
    scrollYProgressMotion: scrollYProgress,
    smoothProgressMotion: smoothProgress,
  };
}

export interface UseSectionProgressOptions {
  /** ScrollTrigger-style offsets, default ["start end", "end start"]. */
  offset?: [string, string];
  spring?: boolean;
  stiffness?: number;
  damping?: number;
  restDelta?: number;
}

/**
 * Per-section scroll progress (0 when section enters viewport, 1 when it leaves).
 * Returns a MotionValue for direct binding to transforms.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  options: UseSectionProgressOptions = {}
): MotionValue<number> {
  const {
    offset = ["start end", "end start"],
    spring = true,
    stiffness = 100,
    damping = 30,
    restDelta = 0.001,
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    // Framer Motion's offset type is a strict union of literal tuples;
    // widen through unknown to accept arbitrary ScrollTrigger-style offsets.
    offset: offset as unknown as ["start end", "end start"],
  });

  const sectionSpring = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta,
  });

  return spring ? sectionSpring : scrollYProgress;
}

export interface UseActiveSectionOptions {
  /** Viewport fraction used to determine the active section. */
  threshold?: number;
  throttleMs?: number;
}

/**
 * Returns the id of the section currently nearest to the viewport threshold.
 * Uses requestAnimationFrame + timestamp throttling for performance.
 */
export function useActiveSection(
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
): string {
  const { threshold = 0.35, throttleMs = 80 } = options;
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    let rafId = 0;
    let lastTime = 0;

    const update = () => {
      const now = performance.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const center = window.scrollY + window.innerHeight * threshold;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= center) {
          current = id;
        }
      }
      setActiveId((prev) => (prev !== current ? current : prev));
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionIds, threshold, throttleMs]);

  return activeId;
}

/**
 * Throttles a callback to a maximum frequency using requestAnimationFrame.
 */
export function useThrottledCallback<T extends unknown[]>(
  callback: (...args: T) => void,
  throttleMs = 16
): (...args: T) => void {
  const lastCall = useRef(0);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: T) => {
      const now = performance.now();
      const remaining = throttleMs - (now - lastCall.current);

      if (remaining <= 0) {
        if (pending.current) {
          clearTimeout(pending.current);
          pending.current = null;
        }
        lastCall.current = now;
        callback(...args);
      } else if (!pending.current) {
        pending.current = setTimeout(() => {
          lastCall.current = performance.now();
          pending.current = null;
          callback(...args);
        }, remaining);
      }
    },
    [callback, throttleMs]
  );
}
