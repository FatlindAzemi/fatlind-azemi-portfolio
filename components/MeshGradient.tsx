"use client";

import { useEffect, useState } from "react";

interface BlobConfig {
  color: string;
  size: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: string;
  duration: string;
  anim: string;
}

const BLOBS: BlobConfig[] = [
  {
    color: "rgba(0, 162, 255, 0.42)",
    size: "72vmin",
    top: "-18%",
    left: "-12%",
    delay: "0s",
    duration: "22s",
    anim: "mesh-float-1",
  },
  {
    color: "rgba(255, 54, 0, 0.32)",
    size: "64vmin",
    top: "8%",
    right: "-18%",
    delay: "-7s",
    duration: "26s",
    anim: "mesh-float-2",
  },
  {
    color: "rgba(120, 80, 255, 0.30)",
    size: "58vmin",
    bottom: "-10%",
    left: "20%",
    delay: "-12s",
    duration: "30s",
    anim: "mesh-float-3",
  },
  {
    color: "rgba(0, 210, 255, 0.22)",
    size: "48vmin",
    bottom: "12%",
    right: "8%",
    delay: "-4s",
    duration: "24s",
    anim: "mesh-float-4",
  },
  {
    color: "rgba(66, 133, 244, 0.18)",
    size: "42vmin",
    top: "38%",
    left: "38%",
    delay: "-10s",
    duration: "28s",
    anim: "mesh-float-5",
  },
];

interface MeshGradientProps {
  className?: string;
}

/**
 * Hardware-accelerated, screen-sized mesh gradient.
 *
 * Uses absolutely positioned radial-gradient blobs animated via CSS keyframes
 * (transform + opacity only). Hidden from assistive tech and respect
 * prefers-reduced-motion.
 */
export default function MeshGradient({ className = "" }: MeshGradientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering animated blobs during SSR to prevent hydration mismatch.
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`mesh-gradient ${className}`}
      />
    );
  }

  return (
    <div aria-hidden="true" className={`mesh-gradient ${className}`}>
      {BLOBS.map((blob, index) => (
        <div
          key={index}
          className={`mesh-blob ${blob.anim}`}
          style={{
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle at 40% 40%, ${blob.color}, transparent 68%)`,
            animationDelay: blob.delay,
            animationDuration: blob.duration,
          }}
        />
      ))}
      <div
        className="mesh-gradient-vignette"
        aria-hidden="true"
      />
    </div>
  );
}
