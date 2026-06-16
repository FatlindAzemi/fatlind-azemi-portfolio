"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { type ReactNode } from "react";

type RevealVariant =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom"
  | "mask"
  | "z-reveal";

type ScrollRevealAs = "div" | "span" | "section" | "article" | "li" | "ul";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  /** Viewport fraction that must be visible before triggering. */
  amount?: number;
  className?: string;
  as?: ScrollRevealAs;
  /** Enable staggerChildren container mode. */
  staggerChildren?: boolean;
  /** Include blur during the hidden state (z-reveal only). */
  blur?: boolean;
}

const transitionDefaults: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

function getVariants(variant: RevealVariant, blur: boolean): Variants {
  const hidden: Record<string, number | string> = { opacity: 0 };
  const visible: Record<string, number | string> = { opacity: 1 };

  switch (variant) {
    case "slide-up":
      hidden.y = 60;
      visible.y = 0;
      break;
    case "slide-down":
      hidden.y = -60;
      visible.y = 0;
      break;
    case "slide-left":
      hidden.x = 60;
      visible.x = 0;
      break;
    case "slide-right":
      hidden.x = -60;
      visible.x = 0;
      break;
    case "zoom":
      hidden.scale = 0.88;
      visible.scale = 1;
      break;
    case "mask":
      hidden.clipPath = "inset(0 100% 0 0)";
      visible.clipPath = "inset(0 0% 0 0)";
      break;
    case "z-reveal":
      hidden.scale = 0.92;
      visible.scale = 1;
      break;
    default:
      break;
  }

  return { hidden, visible };
}

/**
 * Scroll-triggered reveal component with multiple entrance variants.
 *
 * Use `staggerChildren` on a parent and `ScrollRevealItem` on children for
 * orchestral, sequenced reveals.
 */
export default function ScrollReveal({
  children,
  variant = "fade",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  once = true,
  amount = 0.25,
  className = "",
  as: Tag = "div",
  staggerChildren = false,
  blur = true,
}: ScrollRevealProps) {
  const MotionTag = motion[Tag] as typeof motion.div;

  if (staggerChildren) {
    return (
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </MotionTag>
    );
  }

  const variants = getVariants(variant, blur);

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        ...transitionDefaults,
        duration,
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}

interface ScrollRevealItemProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  blur?: boolean;
}

/**
 * Child component for use inside a staggerChildren `ScrollReveal` container.
 */
export function ScrollRevealItem({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 0.8,
  className = "",
  blur = true,
}: ScrollRevealItemProps) {
  const variants = getVariants(variant, blur);

  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{
        ...transitionDefaults,
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
