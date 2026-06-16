"use client";

import { useRef, useMemo } from "react";
import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import ScrollReveal from "../ScrollReveal";
import ZReveal, { ZRevealItem } from "../ZReveal";
import { useLanguage } from "../LanguageProvider";
import { getWorkFields } from "@/lib/i18n";

export default function ExperienceSection() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = useMemo(() => getWorkFields(locale), [locale]);
  const firstField = experiences[0];
  const secondField = experiences[1];
  const thirdField = experiences[2];

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

        {/* Bento Box Grid for Experiences */}
        <div className="relative z-10 w-full max-w-6xl mx-auto mt-4">
          <ZReveal
            staggerChildren
            stagger={0.15}
            delay={0.2}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* First Field - Large Box */}
            {firstField && (
              <ZRevealItem className="md:col-span-7 flex">
                <GlassCard accentColor="rgba(0, 210, 255, 0.25)" className="group w-full h-full flex flex-col p-8 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex-1 flex flex-col">
                    <span className="eyebrow block mb-3 text-azure/90">{firstField.subtitle}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-gradient text-gradient-azure">
                      {firstField.title}
                    </h3>
                    <p className="text-white/80 text-base leading-relaxed mt-auto">
                      {firstField.description}
                    </p>
                  </div>
                </GlassCard>
              </ZRevealItem>
            )}

            {/* Second Field - Tall/Side Box */}
            {secondField && (
              <ZRevealItem className="md:col-span-5 flex">
                <GlassCard accentColor="rgba(255, 54, 0, 0.25)" className="group w-full h-full flex flex-col p-8 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex-1 flex flex-col">
                    <span className="eyebrow block mb-3 text-databricks/90">{secondField.subtitle}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-gradient text-gradient-databricks">
                      {secondField.title}
                    </h3>
                    <p className="text-white/80 text-base leading-relaxed mt-auto">
                      {secondField.description}
                    </p>
                  </div>
                </GlassCard>
              </ZRevealItem>
            )}

            {/* Third Field - Wide Bottom Box */}
            {thirdField && (
              <ZRevealItem className="md:col-span-12 flex">
                <GlassCard accentColor="rgba(167, 139, 250, 0.25)" className="group w-full h-full flex flex-col md:flex-row gap-6 items-start p-8 transition-all duration-300 hover:-translate-y-1">
                  <div className="md:w-1/3 shrink-0">
                    <span className="eyebrow block mb-3 text-violet-400">{thirdField.subtitle}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient text-gradient-purple">
                      {thirdField.title}
                    </h3>
                  </div>
                  <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex items-center">
                    <p className="text-white/80 text-base leading-relaxed">
                      {thirdField.description}
                    </p>
                  </div>
                </GlassCard>
              </ZRevealItem>
            )}
          </ZReveal>
        </div>
      </div>
    </section>
  );
}
