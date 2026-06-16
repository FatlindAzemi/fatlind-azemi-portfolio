"use client";

import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import ScrollReveal from "../ScrollReveal";
import ZReveal, { ZRevealItem } from "../ZReveal";
import { useLanguage } from "../LanguageProvider";
import { t, getMainSkills, getSecondarySkills } from "@/lib/i18n";

export default function SkillsSection() {
  const { locale } = useLanguage();

  const mainSkills = getMainSkills(locale);
  const secondarySkills = getSecondarySkills(locale);

  return (
    <section id="skills" className="section">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <ScrollReveal variant="slide-up" delay={0.1}>
            <span className="eyebrow mb-4 block">{t(locale, "skills.eyebrow")}</span>
          </ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 md:mb-6">
            <AnimatedText text={t(locale, "skills.heading")} stagger={0.03} />
          </h2>
          <ScrollReveal variant="slide-up" delay={0.2}>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              {t(locale, "skills.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Box Tool Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <ZReveal
            staggerChildren
            stagger={0.1}
            delay={0.2}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center"
          >
            {/* Main Skills Row */}
            {mainSkills.map((skill, i) => {
              const gradients = ["text-gradient-azure", "text-gradient-databricks", "text-gradient-purple"];
              const accents = ["rgba(0, 210, 255, 0.2)", "rgba(255, 54, 0, 0.2)", "rgba(167, 139, 250, 0.2)"];
              return (
                <ZRevealItem key={`main-${i}`} className="w-full flex">
                  <GlassCard accentColor={accents[i]} className="group w-full h-full flex flex-col p-8 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-full flex flex-col items-center text-center h-full">
                      <span className={`text-sm font-bold tracking-widest uppercase mb-6 ${gradients[i]} text-gradient`}>
                        {skill.title}
                      </span>
                      <div className="flex flex-wrap gap-2.5 justify-center mt-auto">
                        {skill.tags.map((tag, j) => (
                          <span key={j} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </ZRevealItem>
              );
            })}

            {/* Secondary Skills Row */}
            {secondarySkills.map((skill, i) => (
              <ZRevealItem key={`sec-${i}`} className="w-full flex md:col-span-1 lg:col-span-1">
                <GlassCard accentColor="rgba(255, 255, 255, 0.05)" className="group w-full h-full flex flex-col p-6 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-full flex flex-col items-center text-center h-full opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 block">
                      {skill.title}
                    </span>
                    <div className="flex flex-wrap gap-2 justify-center mt-auto">
                      {skill.tags.map((tag, j) => (
                        <span key={j} className="tag scale-90">
                          {tag}
                        </span>
                      ))}
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
