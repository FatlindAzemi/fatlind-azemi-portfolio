"use client";

import { useRef, useMemo, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import AnimatedText from "../AnimatedText";
import ScrollReveal from "../ScrollReveal";
import ZReveal, { ZRevealItem } from "../ZReveal";
import { useLanguage } from "../LanguageProvider";
import { getWorkFields } from "@/lib/i18n";

// Lokale Premium Spotlight-Komponente für Daten-Effekt
function ExperienceSpotlightCard({ 
  children, 
  className = "", 
  glowColor = "rgba(0, 210, 255, 0.15)" 
}: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-white/5 bg-[#030712]/40 p-8 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/15 w-full h-full flex flex-col ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 flex flex-col flex-1 h-full w-full">{children}</div>
    </div>
  );
}

export default function ExperienceSection() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = useMemo(() => getWorkFields(locale), [locale]);
  const firstField = experiences[0];
  const secondField = experiences[1];
  const thirdField = experiences[2];

  return (
    <section ref={sectionRef} id="experience" className="section py-20">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal variant="slide-up" delay={0.1}>
            <span className="eyebrow mb-4 block tracking-[0.2em]">{t("experience.eyebrow")}</span>
          </ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6">
            <AnimatedText key={`exp-heading-${locale}`} text={t("experience.heading")} stagger={0.03} />
          </h2>
          <ScrollReveal variant="slide-up" delay={0.2}>
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {t("experience.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto mt-4">
          <ZReveal staggerChildren stagger={0.15} delay={0.2} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Box 1 - Azure Expert */}
            {firstField && (
              <ZRevealItem className="md:col-span-7 flex">
                <ExperienceSpotlightCard glowColor="rgba(0, 210, 255, 0.18)">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-azure px-3 py-1 bg-azure/5 rounded-full border border-azure/10">
                      {firstField.subtitle}
                    </span>
                    <span className="text-xs font-mono text-white/20 group-hover:text-azure/40 transition-colors">// [01]</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-azure transition-colors duration-300">
                    {firstField.title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light mt-4">
                    {firstField.description}
                  </p>
                </ExperienceSpotlightCard>
              </ZRevealItem>
            )}

            {/* Box 2 - Databricks Architect */}
            {secondField && (
              <ZRevealItem className="md:col-span-5 flex">
                <ExperienceSpotlightCard glowColor="rgba(255, 54, 0, 0.15)">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-databricks px-3 py-1 bg-databricks/5 rounded-full border border-databricks/10">
                      {secondField.subtitle}
                    </span>
                    <span className="text-xs font-mono text-white/20 group-hover:text-databricks/40 transition-colors">// [02]</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-databricks transition-colors duration-300">
                    {secondField.title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light mt-4">
                    {secondField.description}
                  </p>
                </ExperienceSpotlightCard>
              </ZRevealItem>
            )}

            {/* Box 3 - Enterprise Data Pipelines */}
            {thirdField && (
              <ZRevealItem className="md:col-span-12 flex">
                <ExperienceSpotlightCard glowColor="rgba(167, 139, 250, 0.15)" className="!p-10">
                  <div className="flex flex-col md:flex-row gap-8 items-start justify-between w-full h-full">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-purple-400 px-3 py-1 bg-purple-550/5 rounded-full border border-purple-400/10">
                          {thirdField.subtitle}
                        </span>
                        <span className="text-xs font-mono text-white/20">// [03]</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors duration-300">
                        {thirdField.title}
                      </h3>
                    </div>
                    <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 h-full">
                      <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                        {thirdField.description}
                      </p>
                    </div>
                  </div>
                </ExperienceSpotlightCard>
              </ZRevealItem>
            )}
          </ZReveal>
        </div>
      </div>
    </section>
  );
}
