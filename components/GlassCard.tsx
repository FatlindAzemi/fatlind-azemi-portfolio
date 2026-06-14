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
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
    );
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--accent" as any]: accentColor,
      }}
    >
      {/* Edge glow accent */}
      <div className="card-glow" />

      {/* Inner spotlight on hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
      )}

      <div className={`card-content ${innerClassName}`}>{children}</div>
    </div>
  );
}
