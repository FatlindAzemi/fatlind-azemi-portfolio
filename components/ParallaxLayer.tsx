"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

type ParallaxLayerAs = "div" | "span" | "section" | "article" | "aside";

interface ParallaxLayerProps {
  children: ReactNode;
  /**
   * Parallax speed. Negative values move slower (background), positive faster (foreground).
   * 0 disables vertical parallax.
   */
  speed?: number;
  /** Maximum vertical travel in pixels at the edges of the viewport pass. */
  yOffset?: number;
  /** Opacity keyframes: [start, mid-start, mid-end, end]. */
  opacityRange?: [number, number, number, number];
  /** Scale keyframes: [start, mid, end]. */
  scaleRange?: [number, number, number];
  /** Rotation keyframes in degrees: [start, end]. */
  rotateRange?: [number, number];
  className?: string;
  /** Optional external container ref to drive scroll progress. */
  containerRef?: React.RefObject<HTMLElement | null>;
  as?: ParallaxLayerAs;
  /** Enable spring smoothing on the transform. */
  spring?: boolean;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    restDelta?: number;
  };
  /** Optional direct style overrides. */
  style?: React.CSSProperties;
}

const identityOpacity: [number, number, number, number] = [1, 1, 1, 1];
const identityScale: [number, number, number] = [1, 1, 1];
const identityRotate: [number, number] = [0, 0];

/**
 * Multi-layered parallax component with hardware-accelerated transforms.
 *
 * Layers are driven by Framer Motion's useScroll against the layer itself or an
 * external container. Use multiple layers with different `speed` values to build
 * deep, cinematic scroll scenes.
 */
export default function ParallaxLayer({
  children,
  speed = 0,
  yOffset = 120,
  opacityRange,
  scaleRange,
  rotateRange,
  className = "",
  containerRef,
  as: Tag = "div",
  spring = true,
  springConfig = { stiffness: 100, damping: 30, restDelta: 0.5 },
  style,
}: ParallaxLayerProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const targetRef = containerRef ?? localRef;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [yOffset * speed, -yOffset * speed]
  );
  const springY = useSpring(rawY, springConfig);
  const y: MotionValue<number> = spring ? springY : rawY;

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    opacityRange ?? identityOpacity
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleRange ?? identityScale
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    rotateRange ?? identityRotate
  );

  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      ref={localRef}
      className={`will-change-transform transform-gpu ${className}`}
      style={{
        y,
        opacity,
        scale,
        rotate,
        ...style,
      }}
    >
      {children}
    </MotionTag>
  );
}
