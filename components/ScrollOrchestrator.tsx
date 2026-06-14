"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useScroll, useSpring, type MotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveSection } from "../hooks/useScrollProgress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionRegistration {
  id: string;
  ref: RefObject<HTMLElement | null>;
}

interface ScrollOrchestrationContextValue {
  /** Raw global scroll progress (0..1). */
  scrollYProgress: MotionValue<number>;
  /** Spring-smoothed global scroll progress. */
  smoothProgress: MotionValue<number>;
  /** Raw scrollY in pixels. */
  scrollY: MotionValue<number>;
  /** Currently active section id. */
  activeSectionId: string;
  /** Register a section ref for orchestration. */
  registerSection: (id: string, ref: RefObject<HTMLElement | null>) => void;
}

const ScrollOrchestrationContext = createContext<ScrollOrchestrationContextValue | null>(
  null
);

export function useScrollOrchestration(): ScrollOrchestrationContextValue {
  const ctx = useContext(ScrollOrchestrationContext);
  if (!ctx) {
    throw new Error(
      "useScrollOrchestration must be used within <ScrollOrchestrator>"
    );
  }
  return ctx;
}

interface ScrollOrchestratorProps {
  children: ReactNode;
  /** Section ids in DOM order; used for active-section tracking. */
  sectionIds?: string[];
  /** Render the global scroll progress bar. */
  showProgressBar?: boolean;
  /** Spring config for the global progress bar and context value. */
  springConfig?: {
    stiffness?: number;
    damping?: number;
    restDelta?: number;
  };
}

export default function ScrollOrchestrator({
  children,
  sectionIds = [],
  showProgressBar = true,
  springConfig = { stiffness: 120, damping: 25, restDelta: 0.001 },
}: ScrollOrchestratorProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  const activeSectionId = useActiveSection(sectionIds, {
    threshold: 0.35,
    throttleMs: 80,
  });

  const sectionsRef = useRef<SectionRegistration[]>([]);

  const registerSection = useCallback(
    (id: string, ref: RefObject<HTMLElement | null>) => {
      sectionsRef.current = [
        ...sectionsRef.current.filter((s) => s.id !== id),
        { id, ref },
      ];
    },
    []
  );

  const value = useMemo(
    () => ({
      scrollY,
      scrollYProgress,
      smoothProgress,
      activeSectionId,
      registerSection,
    }),
    [scrollY, scrollYProgress, smoothProgress, activeSectionId, registerSection]
  );

  return (
    <ScrollOrchestrationContext.Provider value={value}>
      {showProgressBar && <ScrollProgressBar progress={smoothProgress} />}
      {children}
    </ScrollOrchestrationContext.Provider>
  );
}

function ScrollProgressBar({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] z-[10000] origin-left pointer-events-none"
      style={{
        scaleX: progress,
        background: "linear-gradient(90deg, #00d2ff, #0078ff, #a78bfa)",
      }}
    />
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  register?: boolean;
}

/**
 * Optional wrapper that registers a section with the orchestrator.
 * Accepts a forwarded ref for external parallax targets.
 */
export function Section({ id, children, className = "" }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { registerSection } = useScrollOrchestration();

  // Register once on mount; ref updates are captured by the mutable object.
  const didRegister = useRef(false);
  if (!didRegister.current) {
    registerSection(id, ref);
    didRegister.current = true;
  }

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
