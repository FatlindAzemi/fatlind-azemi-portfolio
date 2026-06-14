"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  /** Magnetic pull strength, 0 disables the effect. */
  strength?: number;
  /** Label shown inside the custom cursor when hovering. */
  cursorLabel?: string;
  /** Cursor variant reported to CustomCursor. */
  cursorVariant?: "button" | "magnetic" | "text";
}

const SPRING = { damping: 18, stiffness: 240, mass: 0.65 };

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "outline",
  strength = 0.3,
  cursorLabel,
  cursorVariant = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!ref.current || strength === 0) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);

    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantClass =
    variant === "primary"
      ? "btn-glow btn-glow-primary"
      : variant === "ghost"
      ? "btn-glow btn-glow-ghost"
      : "btn-glow";

  const style = { x: springX, y: springY };
  const dataCursor = cursorVariant;
  const dataCursorMagnetic = "true";

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${variantClass} magnetic-btn ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor={dataCursor}
        data-cursor-magnetic={dataCursorMagnetic}
        data-cursor-label={cursorLabel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`${variantClass} magnetic-btn ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      data-cursor-magnetic={dataCursorMagnetic}
      data-cursor-label={cursorLabel}
    >
      {children}
    </motion.button>
  );
}
