"use client";

import { useRef, useMemo, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import AnimatedText from "../AnimatedText";
import ScrollReveal from "../ScrollReveal";
import ZReveal, { ZRevealItem } from "../ZReveal";
import { useLanguage } from "../LanguageProvider";
import { getWorkFields } from "@/lib/i18n";

function ExperienceSharpCard({ 
  children, 
  glowColor = "rgba(0, 210, 255, 0.15)" 
}: { children: React.ReactNode; glowColor?: string }) {
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
      className="group relative w-full h-full rounded-xl border border-white/[0.06] bg-[#050814]/90 p-8 overflow-hidden transition-all duration-300 hover:border-white/20 flex flex-col justify-between shadow-2xl"
    >
      {/* Messerscharfer, fokussierter Lichtstrahl statt diffuser Schein */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
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
    <section ref={sectionRef} id="experience" className="section py-24 bg-transparent">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-24 border-l-2 border-white/20 pl-6 md:pl-8">
          <ScrollReveal variant="slide-up" delay={0.1}>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40 block mb-2">
              {t("experience.eyebrow")}
            </span>
          </ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            <AnimatedText key={`exp-heading-${locale}`} text={t("experience.heading")} stagger={0.03} />
          </h2>
          <ScrollReveal variant="slide-up" delay={0.2}>
            <p className="text-white/40 text-sm md:text-base max-w-xl font-light">
              {t("experience.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <ZReveal staggerChildren stagger={0.1} delay={0.2} className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Box 1 - Azure Field */}
            {firstField && (
              <ZRevealItem className="md:col-span-7 flex">
                <ExperienceSharpCard glowColor="rgba(0, 210, 255, 0.15)">
                  <div className="w-full flex flex-col h-full">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 text-azure">
                      <span className="text-[10px] font-mono tracking-widest uppercase bg-azure/5 px-2.5 py-1 rounded border border-azure/10">
                        {firstField.subtitle}
                      </span>
                      <span className="text-xs font-mono text-white/20">// SYS_REF: 01</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors">
                      {firstField.title}
                    </h3>
                    <p className="text-white/50 group-hover:text-white/70 transition-colors text-xs sm:text-sm leading-relaxed font-light mt-2">
                      {firstField.description}
                    </p>
                  </div>
                </ExperienceSharpCard>
              </ZRevealItem>
            )}

            {/* Box 2 - Databricks Field */}
            {secondField && (
              <ZRevealItem className="md:col-span-5 flex">
                <ExperienceSharpCard glowColor="rgba(255, 54, 0, 0.12)">
                  <div className="w-full flex flex-col h-full">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 text-databricks">
                      <span className="text-[10px] font-mono tracking-widest uppercase bg-databricks/5 px-2.5 py-1 rounded border border-databricks/10">
                        {secondField.subtitle}
                      </span>
                      <span className="text-xs font-mono text-white/20">// SYS_REF: 02</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors">
                      {secondField.title}
                    </h3>
                    <p className="text-white/50 group-hover:text-white/70 transition-colors text-xs sm:text-sm leading-relaxed font-light mt-2">
                      {secondField.description}
                    </p>
                  </div>
                </ExperienceSharpCard>
              </ZRevealItem>
            )}

            {/* Box 3 - Architecture Field */}
            {thirdField && (
              <ZRevealItem className="md:col-span-12 flex">
                <ExperienceSharpCard glowColor="rgba(167, 139, 250, 0.12)">
                  <div className="w-full flex flex-col md:flex-row gap-6 md:gap-12 items-start justify-between">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-4 text-purple-400">
                        <span className="text-[10px] font-mono tracking-widest uppercase bg-purple-400/5 px-2.5 py-1 rounded border border-purple-400/10">
                          {thirdField.subtitle}
                        </span>
                        <span className="text-xs font-mono text-white/20">// SYS_REF: 03</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                        {thirdField.title}
                      </h3>
                    </div>
                    <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-white/5 pt-5 md:pt-0 md:pl-8">
                      <p className="text-white/50 group-hover:text-white/70 transition-colors text-xs sm:text-sm leading-relaxed font-light">
                        {thirdField.description}
                      </p>
                    </div>
                  </div>
                </ExperienceSharpCard>
              </ZRevealItem>
            )}
          </ZReveal>
        </div>
      </div>
    </section>
  );
}
