"use client";

import { motion } from "framer-motion";

interface SketchFrameProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  size?: number;
}

export default function SketchFrame({
  className = "",
  color = "rgba(255,255,255,0.14)",
  strokeWidth = 1,
  size = 160,
}: SketchFrameProps) {
  const half = size / 2;
  const arm = size * 0.18;

  const path = `
    M ${-half} ${-half + arm} L ${-half} ${-half} L ${-half + arm} ${-half}
    M ${half - arm} ${-half} L ${half} ${-half} L ${half} ${-half + arm}
    M ${half} ${half - arm} L ${half} ${half} L ${half - arm} ${half}
    M ${-half + arm} ${half} L ${-half} ${half} L ${-half} ${half - arm}
  `;

  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox={`${-half} ${-half} ${size} ${size}`}
      fill="none"
    >
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
