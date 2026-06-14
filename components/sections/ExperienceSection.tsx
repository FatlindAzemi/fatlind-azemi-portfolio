"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import ZReveal, { ZRevealItem } from "../ZReveal";
import ScrollReveal from "../ScrollReveal";
import ParallaxLayer from "../ParallaxLayer";
import { useLanguage } from "../LanguageProvider";
import { useScrollTimeline } from "../../hooks/useScrollTimeline";
import { ArrowUpRight } from "lucide-react";
import { getHighlights, getExperience } from "@/lib/i18n";

export default function ExperienceSection() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const highlights = useMemo(() => getHighlights(locale), [locale]);
  const experiences = useMemo(() => getExperience(locale), [locale]);
  const featured = experiences[0];
  const secondary = experiences.slice(1);

  useScrollTimeline(
    {
      trigger: sectionRef,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      builder: (tl) => {
        if (featuredRef.current) {
          tl.fromTo(
            featuredRef.current,
            { y: 120, opacity: 0.5, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "none" },
            0
          );
        }
        if (secondaryRef.current) {
          tl.fromTo(
            secondaryRef.current.children,
            { y: 80, opacity: 0.5 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.15,
              ease: "none",
            },
            0.2
          );
        }
      },
    },
    []
  );

  return (
    <section ref={sectionRef} id="experience" className="section">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <ScrollReveal variant="slide-up" delay={0.1}>
            <span className="eyebrow mb-4 block">{t("experience.eyebrow")}</span>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 md:mb-6">
            <AnimatedText key={`exp-heading-${locale}`} text={t("experience.heading")} stagger={0.03} />
          </h2>

          <ScrollReveal variant="slide-up" delay={0.2}>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              {t("experience.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Impact metrics */}
        <ParallaxLayer
          speed={0.15}
          yOffset={40}
          className="relative z-10"
        >
          <ZReveal
            staggerChildren
            stagger={0.1}
            delay={0.2}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24"
          >
            {highlights.map((item, i) => (
              <ZRevealItem key={i}>
                <GlassCard
                  className="text-center h-full"
                  accentColor="rgba(255,255,255,0.12)"
                  hover3d={false}
                >
                  <div className="py-4 px-2">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                      {item.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/45 font-mono uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                </GlassCard>
              </ZRevealItem>
            ))}
          </ZReveal>
        </ParallaxLayer>

        {/* Featured current role */}
        <div ref={featuredRef} className="mb-8 md:mb-12">
          <GlassCard accentColor={featured.accent} className="group">
            <div className="p-8 md:p-12 lg:p-14">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="eyebrow">{featured.period}</span>
                    <span className="text-[10px] px-3 py-1 rounded-full border border-azure/30 text-azure/90 font-mono uppercase tracking-wider">
                      {t("experience.current")}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {featured.role}
                  </h3>
                  <p className="text-white/60 text-base md:text-lg">
                    {featured.context}
                  </p>
                </div>
                <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:border-azure/40 group-hover:bg-azure/5 transition-all">
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-azure transition-colors" />
                </div>
              </div>

              <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-4xl mb-8">
                {featured.description}
              </p>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3 block">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {featured.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[11px] font-mono uppercase tracking-wider px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Secondary roles */}
        <div ref={secondaryRef}>
          <ZReveal
            staggerChildren
            stagger={0.12}
            delay={0.4}
            className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8"
          >
            {secondary.map((exp, i) => (
              <ZRevealItem key={i}>
                <GlassCard accentColor={exp.accent} className="group h-full">
                  <div className="p-7 md:p-9 lg:p-10">
                    <span className="eyebrow block mb-3">{exp.period}</span>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-white/50 text-sm md:text-base mb-4">
                      {exp.context}
                    </p>
                    <p className="text-white/55 text-sm md:text-base leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3 block">
                        Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.05] text-white/65"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ZRevealItem>
            ))}
          </ZReveal>
        </div>
      </div>
    </section>
  );
}
