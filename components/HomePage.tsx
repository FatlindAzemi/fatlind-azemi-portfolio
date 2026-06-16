"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import CertsSection from "./sections/CertsSection";
import ContactSection from "./sections/ContactSection";
import { useLanguage } from "./LanguageProvider";
import { getNavItems } from "@/lib/i18n";
import { useActiveSection } from "../hooks/useScrollProgress";

const PortfolioCanvas = dynamic(() => import("./PortfolioCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 w-full h-full bg-background z-0" aria-hidden />
  ),
});

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress z-50" style={{ scaleX }} />;
}

function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setPosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="cursor-spotlight hide-mobile"
      style={
        {
          "--cursor-x": `${position.x}%`,
          "--cursor-y": `${position.y}%`,
        } as React.CSSProperties
      }
    />
  );
}

function SideDots() {
  const { locale } = useLanguage();
  const navItems = useMemo(() => getNavItems(locale), [locale]);
  const sectionIds = useMemo(() => navItems.map((n) => n.id), [navItems]);
  const active = useActiveSection(sectionIds);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group flex items-center justify-end gap-4"
          data-cursor="link"
        >
          <span
            className={`text-[10px] font-mono tracking-widest transition-all duration-300 uppercase ${
              active === item.id
                ? "text-white/80"
                : "text-white/0 group-hover:text-white/40 translate-x-4 group-hover:translate-x-0"
            }`}
          >
            {item.label}
          </span>
          <div
            className={`w-1 transition-all duration-500 rounded-full ${
              active === item.id
                ? "h-8 bg-white"
                : "h-2 bg-white/20 group-hover:bg-white/40 group-hover:h-4"
            }`}
          />
        </a>
      ))}
    </div>
  );
}

function ZSection({ index, children }: { index: number; children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const step = 1 / 5;
  const center = index * step;
  const ref = useRef<HTMLDivElement>(null);

  const opacity = useTransform(
    scrollYProgress,
    [center - 0.15, center - 0.05, center + 0.05, center + 0.15],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [center - 0.2, center, center + 0.2],
    [0.5, 1, 2.5]
  );

  // Client-side detection to trigger hydration re-render and break pointer-events deadlock
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const isMob = window.innerWidth < 1024;
    setIsMobile(isMob);
    
    // Set initial pointerEvents value manually
    if (ref.current) {
      if (isMob) {
        ref.current.style.pointerEvents = "none";
      } else {
        const isActive = Math.abs(scrollYProgress.get() - center) < 0.12;
        ref.current.style.pointerEvents = isActive ? "auto" : "none";
      }
    }
  }, [center, scrollYProgress]);

  // Update pointer-events style manually during scroll, avoiding Framer Motion Web Animations API crash on Safari
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!ref.current) return;
    if (isMobile) {
      ref.current.style.pointerEvents = "none";
      return;
    }
    const isActive = Math.abs(latest - center) < 0.12;
    ref.current.style.pointerEvents = isActive ? "auto" : "none";
  });

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      <div className={`w-full max-h-screen overflow-y-auto no-scrollbar pb-24 pt-24 ${isMobile ? "pointer-events-none" : "pointer-events-auto"}`}>
        {children}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { locale } = useLanguage();
  const navItems = useMemo(() => getNavItems(locale), [locale]);

  return (
    <main className="relative w-full bg-background overflow-x-hidden">
      <ScrollProgress />
      <CursorSpotlight />
      <SideDots />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <PortfolioCanvas />
      </div>

      {/* 
        Scroll Container in normal document flow.
        Creates exactly 100vh per section to power the Framer Motion scroll progress.
      */}
      <div className="relative w-full flex flex-col pointer-events-none">
        {navItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="w-full h-[100vh]"
          />
        ))}
      </div>

      {/* FIXED container instead of sticky to prevent CSS bugs with overflow-x-hidden */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-10 pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={locale}
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <ZSection index={0}><HeroSection /></ZSection>
            <ZSection index={1}><AboutSection /></ZSection>
            <ZSection index={2}><ExperienceSection /></ZSection>
            <ZSection index={3}><SkillsSection /></ZSection>
            <ZSection index={4}><CertsSection /></ZSection>
            <ZSection index={5}><ContactSection /></ZSection>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
