"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  type?: "chars" | "words";
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  as: Tag = "span",
  type = "words",
  delay = 0,
  stagger: staggerDelay = 0.04,
  duration = 0.7,
  once = true,
}: AnimatedTextProps) {
  const items = type === "chars" ? text.split("") : text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={container}
    >
      <Tag className="inline">
        {items.map((item, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block"
            style={{ whiteSpace: type === "words" ? "pre" : "normal" }}
          >
            {type === "words" ? (i < items.length - 1 ? `${item} ` : item) : item}
          </motion.span>
        ))}
      </Tag>
    </motion.span>
  );
}
