"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  /**
   * When `true`, the first mount is not animated.
   * Use this when PageTransition is placed inside a persistent layout
   * (e.g. `app/layout.tsx`) so only route navigations animate.
   * In `app/template.tsx` (re-mounted on every navigation) keep `false`.
   */
  skipInitial?: boolean;
  className?: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PageTransition({
  children,
  skipInitial = false,
  className,
}: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const transition: Transition = {
    duration: prefersReducedMotion ? 0.12 : 0.55,
    ease: EASE_OUT_EXPO,
  };

  const variants: Variants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
      scale: prefersReducedMotion ? 1 : 0.985,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      scale: prefersReducedMotion ? 1 : 1.005,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(6px)",
    },
  };

  return (
    <AnimatePresence mode="wait" initial={!skipInitial}>
      <motion.div
        key={pathname}
        layoutId="page-transition-shell"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        style={{ willChange: "transform, opacity", transformOrigin: "center top" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
