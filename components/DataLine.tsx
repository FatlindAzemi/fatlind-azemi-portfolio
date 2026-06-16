"use client";

import { motion } from "framer-motion";

interface DataLineProps {
  className?: string;
  color?: string;
}

export default function DataLine({
  className = "",
  color = "rgba(0, 210, 255, 0.35)",
}: DataLineProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 800 200"
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="data-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="20%" stopColor={color} stopOpacity="0.6" />
          <stop offset="80%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="data-line-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main data line */}
      <motion.path
        d="M -20 100 C 120 40, 280 160, 400 100 S 680 40, 820 100"
        stroke="url(#data-line-gradient)"
        strokeWidth="1.5"
        filter="url(#data-line-glow)"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] as const }}
      />

      {/* Traveling data packets */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          r="3"
          fill="#00d2ff"
          filter="url(#data-line-glow)"
        >
          <animateMotion
            path="M -20 100 C 120 40, 280 160, 400 100 S 680 40, 820 100"
            dur="4s"
            repeatCount="indefinite"
            begin={`${i * 1.3}s`}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.2;0.8;1"
            dur="4s"
            repeatCount="indefinite"
            begin={`${i * 1.3}s`}
          />
        </circle>
      ))}
    </svg>
  );
}
