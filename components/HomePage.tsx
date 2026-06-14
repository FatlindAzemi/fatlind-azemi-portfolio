"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import PortfolioCanvas from "./PortfolioCanvas";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import SkillsSection from "./sections/SkillsSection";
import CertsSection from "./sections/CertsSection";
import ContactSection from "./sections/ContactSection";
import { useLanguage } from "./LanguageProvider";
import { getNavItems } from "@/lib/i18n";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
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
  const { locale, t } = useLanguage();
  const navItems = useMemo(
    () => getNavItems(locale),
    [locale]
  );
  const [active, setActive] = useState("hero");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        for (let i = navItems.length - 1; i >= 0; i--) {
          const el = document.getElementById(navItems[i].id);
          if (el && el.offsetTop <= scrollPos) {
            setActive(navItems[i].id);
            break;
          }
        }
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [navItems]);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group flex items-center justify-end gap-4"
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

export default function HomePage() {
  const { locale } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  return (
    <main className="relative w-full bg-[#03040b] overflow-x-hidden">
      <ScrollProgress />
      <CursorSpotlight />
      <SideDots />

      <div className="fixed inset-0 z-0">
        <PortfolioCanvas scrollProgress={scrollProgress} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={locale}
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <CertsSection />
          <ContactSection />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
