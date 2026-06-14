"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type Transition } from "framer-motion";

interface ParallaxWrapperProps {
  children: ReactNode;
  yOffset?: number;
  scale?: [number, number];
  opacity?: [number, number];
  rotate?: [number, number];
  className?: string;
  transition?: Transition;
}

export default function ParallaxWrapper({
  children,
  yOffset = 80,
  scale,
  opacity,
  rotate,
  className = "",
  transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset]);
  const s = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scale ? [scale[0], 1, scale[1]] : [1, 1, 1]
  );
  const o = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    opacity ? [opacity[0], 1, 1, opacity[1]] : [1, 1, 1, 1]
  );
  const r = useTransform(
    scrollYProgress,
    [0, 1],
    rotate ? [rotate[0], rotate[1]] : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, scale: s, opacity: o, rotate: r }}
      className={className}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
