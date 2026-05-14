import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CurtainRevealProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
}

export default function CurtainReveal({
  children,
  isVisible,
  duration = 0.8,
}: CurtainRevealProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const clipPath = isVisible ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)';
  const transition = {
    duration: prefersReduced ? 0 : duration,
    ease: [0.76, 0, 0.24, 1] as const,
  };

  if (prefersReduced) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ clipPath }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
