import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InkDropState {
  x: number;
  y: number;
  isActive: boolean;
}

export function useInkDrop(onComplete: () => void) {
  // Lazy initializer — runs once, survives re-renders, safe for SSR
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [inkState, setInkState] = useState<InkDropState>({
    x: 0,
    y: 0,
    isActive: false,
  });

  const trigger = useCallback(
    (e: React.MouseEvent | { clientX: number; clientY: number }) => {
      if (reducedMotion) {
        onComplete();
        return;
      }

      setInkState({
        x: e.clientX,
        y: e.clientY,
        isActive: true,
      });
    },
    [onComplete, reducedMotion],
  );

  const InkDropOverlay = (
    <AnimatePresence>
      {inkState.isActive && (
        <motion.div
          key="ink-drop"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 50, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          onAnimationComplete={() => {
            onComplete();
          }}
          style={{
            position: "fixed",
            left: inkState.x - 10,
            top: inkState.y - 10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            pointerEvents: "none",
            zIndex: 9999,
            willChange: "transform",
          }}
        />
      )}
    </AnimatePresence>
  );

  return { trigger, InkDropOverlay };
}

export default useInkDrop;
