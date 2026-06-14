"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AnimatedText from "../AnimatedText";
import MagneticButton from "../MagneticButton";
import SketchFrame from "../SketchFrame";
import ParallaxLayer from "../ParallaxLayer";
import ScrollReveal from "../ScrollReveal";
import { useLanguage } from "../LanguageProvider";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section relative flex-col justify-center min-h-screen"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity, y }}
      >
        {/* Floating frame accent behind the name */}
        <ParallaxLayer
          speed={0.25}
          yOffset={60}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40"
        >
          <SketchFrame
            size={420}
            color="rgba(0, 210, 255, 0.12)"
            strokeWidth={1}
          />
        </ParallaxLayer>
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4"
        style={{ opacity, y }}
      >
        <ScrollReveal variant="z-reveal" delay={0.2} duration={0.8}>
          <div className="eyebrow mb-6">
            {t("hero.eyebrow")}
          </div>
        </ScrollReveal>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-4 sm:mb-6 leading-[0.95]">
          <AnimatedText
            text="Fatlind Azemi"
            type="words"
            stagger={0.12}
            duration={0.9}
            delay={0.4}
          />
        </h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: 1.1,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl font-light text-white/60 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
        >
          {t("hero.subtitle")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.5,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href="#contact"
            variant="primary"
            className="!px-10 !py-4 text-base min-w-[180px]"
          >
            {t("hero.ctaPrimary")}
          </MagneticButton>
          <MagneticButton
            href="#experience"
            variant="outline"
            className="!px-10 !py-4 text-base min-w-[180px]"
          >
            {t("hero.ctaSecondary")}
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="eyebrow">{t("hero.scroll")}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
