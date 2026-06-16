"use client";

import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import AnimatedText from "../AnimatedText";
import ScrollReveal from "../ScrollReveal";
import ZReveal, { ZRevealItem } from "../ZReveal";
import { useLanguage } from "../LanguageProvider";
import { t, getMainSkills, getSecondarySkills } from "@/lib/i18n";

function SkillSpotlightCard({ 
  children, 
  accentColor 
}: { children: React.ReactNode; accentColor: string }) {
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
      className="group relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/10 w-full h-full flex flex-col"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              ${accentColor},
              transparent 85%
            )
          `,
        }}
      />
      <div className="relative z-10 flex flex-col h-full w-full">{children}</div>
    </div>
  );
}

export default function SkillsSection() {
  const { locale } = useLanguage();

  const mainSkills = getMainSkills(locale);
  const secondarySkills = getSecondarySkills(locale);

  return (
    <section id="skills" className="section py-20">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal variant="slide-up" delay={0.1}>
            <span className="eyebrow mb-4 block tracking-[0.2em]">{t(locale, "skills.eyebrow")}</span>
          </ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6">
            <AnimatedText text={t(locale, "skills.heading")} stagger={0.03} />
          </h2>
          <ScrollReveal variant="slide-up" delay={0.2}>
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto font-light">
              {t(locale, "skills.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid Layout */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <ZReveal staggerChildren stagger={0.08} delay={0.2} className="grid grid-cols-1 md:grid-cols-6 gap-6">
            
            {/* Main Infrastructure Skill (Col-Span 3) */}
            {mainSkills.map((skill, i) => {
              const gradients = ["text-azure", "text-databricks", "text-purple-400"];
              const accents = ["rgba(0, 210, 255, 0.12)", "rgba(255, 54, 0, 0.1)", "rgba(167, 139, 250, 0.1)"];
              return (
                <ZRevealItem key={`main-${i}`} className="md:col-span-3 flex">
                  <SkillSpotlightCard accentColor={accents[i]}>
                    <div className="w-full text-left flex flex-col h-full justify-between">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                        <span className={`text-xs font-mono font-bold tracking-widest uppercase ${gradients[i]}`}>
                          // {skill.title}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-current transition-colors" className={gradients[i]} />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {skill.tags.map((tag, j) => (
                          <span key={j} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/80 transition-all duration-300 hover:bg-white/[0.06] hover:text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SkillSpotlightCard>
                </ZRevealItem>
              );
            })}

            {/* Secondary Skills Block (Col-Span 2 each für perfektes Asymmetrie-Verhältnis) */}
            {secondarySkills.map((skill, i) => (
              <ZRevealItem key={`sec-${i}`} className="md:col-span-2 flex">
                <SkillSpotlightCard accentColor="rgba(255, 255, 255, 0.03)">
                  <div className="w-full text-left flex flex-col h-full">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 border-b border-white/5 pb-3 mb-4 block">
                      {skill.title}
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {skill.tags.map((tag, j) => (
                        <span key={j} className="text-[11px] font-mono px-2 py-1 rounded bg-transparent text-white/50 group-hover:text-white/80 transition-colors border border-white/[0.03]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SkillSpotlightCard>
              </ZRevealItem>
            ))}
          </ZReveal>
        </div>

      </div>
    </section>
  );
}
