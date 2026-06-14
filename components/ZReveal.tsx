"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { type ReactNode } from "react";

interface ZRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "span" | "section" | "article" | "li";
  staggerChildren?: boolean;
}

const transitionDefaults: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    z: -60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    z: 0,
    filter: "blur(0px)",
  },
};

export default function ZReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  once = true,
  amount = 0.25,
  as: Tag = "div",
  staggerChildren = false,
}: ZRevealProps) {
  const MotionTag = motion[Tag];

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

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, scale: 0.92, z: -60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, scale: 1, z: 0, filter: "blur(0px)" }}
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

export function ZRevealItem({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
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
