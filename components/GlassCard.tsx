"use client";

import { useRef, useState, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  accentColor?: string;
  hover3d?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  innerClassName = "",
  accentColor = "rgba(255,255,255,0.12)",
  hover3d = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Refs back the transform + spotlight so mousemove mutates the DOM directly
  // instead of triggering a React state update (and re-rendering the card's
  // entire subtree) on every frame the cursor is over the card.
  const transformRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3d || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    if (transformRef.current) {
      transformRef.current.style.transform =
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.background =
        `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.05), transparent 40%)`;
    }
  };

  const handleMouseLeave = () => {
    if (transformRef.current) {
      transformRef.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        transformRef.current = node;
      }}
      className={`glass-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--accent" as any]: accentColor,
      }}
    >
      {/* Edge glow accent */}
      <div className="card-glow" />

      {/* Inner spotlight on hover */}
      {isHovered && (
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        />
      )}

      <div className={`card-content ${innerClassName}`}>{children}</div>
    </div>
  );
}
