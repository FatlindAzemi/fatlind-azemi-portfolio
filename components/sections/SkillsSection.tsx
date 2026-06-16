"use client";

import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import AnimatedText from "../AnimatedText";
import ScrollReveal from "../ScrollReveal";
import ZReveal, { ZRevealItem } from "../ZReveal";
import { useLanguage } from "../LanguageProvider";
import { t, getMainSkills, getSecondarySkills } from "@/lib/i18n";

function SkillSharpCard({ 
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
      className="group relative w-full h-full rounded-xl border border-white/[0.05] bg-[#050814]/90 p-6 overflow-hidden transition-all duration-300 hover:border-white/15 flex flex-col shadow-xl"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${mouseX}px ${mouseY}px,
              ${accentColor},
              transparent 80%
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
    <section id="skills" className="section py-24 bg-transparent">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-left mb-16 md:mb-24 border-l-2 border-white/20 pl-6 md:pl-8">
          <ScrollReveal variant="slide-up" delay={0.1}>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40 block mb-2">
              {t(locale, "skills.eyebrow")}
            </span>
          </ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            <AnimatedText text={t(locale, "skills.heading")} stagger={0.03} />
          </h2>
          <ScrollReveal variant="slide-up" delay={0.2}>
            <p className="text-white/40 text-sm md:text-base max-w-xl font-light">
              {t(locale, "skills.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <ZReveal staggerChildren stagger={0.08} delay={0.2} className="grid grid-cols-1 md:grid-cols-6 gap-5">
            
            {/* Main Skills (Col-Span 3) */}
            {mainSkills.map((skill, i) => {
              const gradients = ["text-azure", "text-databricks", "text-purple-400"];
              const accents = ["rgba(0, 210, 255, 0.15)", "rgba(255, 54, 0, 0.12)", "rgba(167, 139, 250, 0.12)"];
              return (
                <ZRevealItem key={`main-${i}`} className="md:col-span-3 flex">
                  <SkillSharpCard accentColor={accents[i]}>
                    <div className="w-full flex flex-col h-full justify-between">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                        <span className={`text-xs font-mono font-bold tracking-widest uppercase ${gradients[i]}`}>
                          // {skill.title}
                        </span>
                        <div className={`w-1 h-1 rounded-full ${gradients[i]} bg-current opacity-40 group-hover:opacity-100 transition-opacity`} />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {skill.tags.map((tag, j) => (
                          <span key={j} className="text-xs font-mono px-3 py-1.5 rounded bg-white/[0.02] border border-white/5 text-white/60 group-hover:text-white/90 group-hover:border-white/10 transition-all duration-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SkillSharpCard>
                </ZRevealItem>
              );
            })}

            {/* Secondary Skills Block (Col-Span 2) */}
            {secondarySkills.map((skill, i) => (
              <ZRevealItem key={`sec-${i}`} className="md:col-span-2 flex">
                <SkillSharpCard accentColor="rgba(255, 255, 255, 0.04)">
                  <div className="w-full flex flex-col h-full justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 border-b border-white/5 pb-3 mb-5 block">
                      {skill.title}
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {skill.tags.map((tag, j) => (
                        <span key={j} className="text-[11px] font-mono px-2 py-1 rounded bg-transparent text-white/40 group-hover:text-white/80 transition-colors border border-white/[0.04]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SkillSharpCard>
              </ZRevealItem>
            ))}
          </ZReveal>
        </div>

      </div>
    </section>
  );
}
