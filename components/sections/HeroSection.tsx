"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AnimatedText from "../AnimatedText";
import MagneticButton from "../MagneticButton";
import SketchFrame from "../SketchFrame";
import { useLanguage } from "../LanguageProvider";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax: each element moves at a different speed on scroll,
  // creating genuine 3D depth instead of one flat plane. Foreground (CTA)
  // moves fastest, background frame barely moves and rotates slightly.
  const layerBgRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const layerBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgRotateSpring = useSpring(layerBgRotate, { stiffness: 60, damping: 24 });
  const bgScaleSpring = useSpring(layerBgScale, { stiffness: 60, damping: 24 });

  // Eyebrow — slowest foreground drift.
  const eyebrowY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), { stiffness: 100, damping: 30 });
  // Name — medium drift + subtle blur as it recedes.
  const nameY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), { stiffness: 100, damping: 30 });
  const nameOpacity = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0]), { stiffness: 100, damping: 30 });
  // Subtitle — faster drift, fades earlier.
  const subtitleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -160]), { stiffness: 100, damping: 30 });
  const subtitleOpacity = useSpring(useTransform(scrollYProgress, [0, 0.45], [1, 0]), { stiffness: 100, damping: 30 });
  // CTA — fastest drift, fades earliest (closest to viewer).
  const ctaY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -230]), { stiffness: 100, damping: 30 });
  const ctaOpacity = useSpring(useTransform(scrollYProgress, [0, 0.35], [1, 0]), { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section relative flex-col justify-center min-h-screen"
    >
      {/* Background frame: barely translates, rotates + scales subtly for depth. */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{ rotate: bgRotateSpring, scale: bgScaleSpring }}
      >
        <SketchFrame
          size={420}
          color="rgba(0, 210, 255, 0.12)"
          strokeWidth={1}
        />
      </motion.div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <motion.div style={{ y: eyebrowY }}>
          <ScrollRevealInline delay={0.2}>
            <div className="eyebrow mb-6">{t("hero.eyebrow")}</div>
          </ScrollRevealInline>
        </motion.div>

        <motion.h1
          style={{ y: nameY, opacity: nameOpacity }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-4 sm:mb-6 leading-[0.95]"
        >
          <AnimatedText
            text="Fatlind Azemi"
            type="words"
            stagger={0.12}
            duration={0.9}
            delay={0.4}
          />
        </motion.h1>

        <motion.h2
          style={{ y: subtitleY, opacity: subtitleOpacity }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl font-light text-white/60 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
        >
          {t("hero.subtitle")}
        </motion.h2>

        <motion.div
          style={{ y: ctaY, opacity: ctaOpacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
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

      </div>

      <motion.div
        style={{ opacity: ctaOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="w-[32px] h-[52px] rounded-full border-2 border-white/40 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full mouse-scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
}

// Lightweight inline mask-reveal for the eyebrow line, keeps the hero
// self-contained without importing ScrollReveal (which is viewport-triggered
// and would race the scroll transforms above).
function ScrollRevealInline({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
