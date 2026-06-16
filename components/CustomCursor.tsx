"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useSpring, useMotionValue, type Transition } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

type CursorVariant = "default" | "link" | "button" | "text" | "magnetic";

interface CursorState {
  variant: CursorVariant;
  label: string;
  magnetic: boolean;
  target: HTMLElement | null;
}

const VARIANTS: Record<CursorVariant, { width: number; height: number; radius: string }> = {
  default: { width: 12, height: 12, radius: "50%" },
  link: { width: 38, height: 38, radius: "50%" },
  button: { width: 60, height: 60, radius: "50%" },
  text: { width: 128, height: 48, radius: "9999px" },
  magnetic: { width: 80, height: 80, radius: "50%" },
};

// Subtle-elegant springs: smooth, not snappy. Ring follows with a soft lag,
// magnetic pull eases in gently. tuned for 60/120fps on transform only.
const SPRING = { damping: 30, stiffness: 320, mass: 0.6 };
const MAGNETIC_SPRING = { damping: 32, stiffness: 220, mass: 0.8 };

function isFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CustomCursor() {
  // The cursor must only mount after hydration. `enabled` is computed from
  // matchMedia (window), which returns false on the server but a real value on
  // the client — so we MUST gate the first client render on a mounted flag to
  // avoid a hydration mismatch (server renders null, client would render the
  // cursor). setState-in-effect is the canonical pattern for this; the lint
  // rule is a false positive here.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>({
    variant: "default",
    label: "",
    magnetic: false,
    target: null,
  });

  const enabled = useMemo(() => isFinePointer() && !prefersReducedMotion(), []);

  const cursorLabel = state.label.trim();
  const currentVariant = VARIANTS[state.variant] ?? VARIANTS.default;

  const mouse = useMousePosition({ throttle: true });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, SPRING);
  const smoothY = useSpring(y, SPRING);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothMagX = useSpring(mx, MAGNETIC_SPRING);
  const smoothMagY = useSpring(my, MAGNETIC_SPRING);

  // Hide default cursor globally while this component is active.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration gate: this setState only runs once on mount and is required to avoid SSR/client mismatch
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [mounted, enabled]);

  // Track pointer position with optional magnetic pull toward element center.
  useEffect(() => {
    if (!mounted || !enabled) return;

    let targetX = mouse.x;
    let targetY = mouse.y;

    if (state.magnetic && state.target) {
      const rect = state.target.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    }

    x.set(targetX);
    y.set(targetY);
    mx.set(targetX);
    my.set(targetY);
  }, [mouse, state, mounted, enabled, x, y, mx, my]);

  // Hover / cursor-variant detection via event delegation.
  useEffect(() => {
    if (!mounted || !enabled) return;

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!target) return;

      const variant = (target.dataset.cursor as CursorVariant) || "default";
      const label = target.dataset.cursorLabel || "";
      const magnetic =
        target.dataset.cursorMagnetic === "true" || variant === "magnetic";

      setState({ variant, label, magnetic, target: magnetic ? target : null });
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      setState({ variant: "default", label: "", magnetic: false, target: null });
    };

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [mounted, enabled]);

  // Visibility tied to document pointer presence.
  useEffect(() => {
    if (!mounted || !enabled) return;
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    document.body.addEventListener("mouseenter", onEnter);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted, enabled]);

  const ringTransition: Transition = useMemo(
    () => ({
      type: "spring",
      damping: 22,
      stiffness: 320,
      mass: 0.5,
    }),
    []
  );

  if (!mounted || !enabled) return null;

  return (
    <>
      {/* Outer morphing ring + label */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10001] will-change-transform"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
          initial={false}
          animate={{
            width: currentVariant.width,
            height: currentVariant.height,
            borderRadius: currentVariant.radius,
            opacity: visible ? 1 : 0,
            scale: state.magnetic ? 1.08 : 1,
          }}
          transition={ringTransition}
        >
          {/* Ring border */}
          <motion.div
            className="absolute inset-0 rounded-inherit border border-white/85"
            initial={false}
            animate={{ opacity: visible ? 1 : 0 }}
            style={{ borderRadius: "inherit" }}
          />

          {/* Label, only visible in text mode */}
          <motion.span
            className="pointer-events-none whitespace-nowrap text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-white px-3 text-center"
            initial={false}
            animate={{
              opacity: cursorLabel ? 1 : 0,
              scale: cursorLabel ? 1 : 0.85,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {cursorLabel}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10001] will-change-transform"
        style={{ x: smoothMagX, y: smoothMagY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
          initial={false}
          animate={{
            width: state.variant === "default" ? 5 : 0,
            height: state.variant === "default" ? 5 : 0,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            type: "spring",
            damping: 26,
            stiffness: 420,
            mass: 0.4,
          }}
        />
      </motion.div>
    </>
  );
}
