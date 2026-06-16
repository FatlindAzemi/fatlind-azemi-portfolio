"use client";

import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import DataLine from "../DataLine";
import ParallaxLayer from "../ParallaxLayer";
import ScrollReveal from "../ScrollReveal";
import { useLanguage } from "../LanguageProvider";
import { getAboutStats, getEducation } from "@/lib/i18n";

export default function AboutSection() {
  const { t, locale } = useLanguage();
  const stats = getAboutStats(locale);
  const education = getEducation(locale);

  return (
    <section id="about" className="section overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background data line passes safely behind the protected glass layer */}
        <ParallaxLayer
          speed={-0.3}
          yOffset={40}
          opacityRange={[0.1, 0.4, 0.4, 0.1]}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-32 pointer-events-none"
        >
          <DataLine color="rgba(0, 210, 255, 0.1)" className="w-full h-full" />
        </ParallaxLayer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Profile card — stabilized (no ParallaxLayer to prevent layout shifting on scroll) */}
          <div className="order-2 lg:order-1 relative">
            <ScrollReveal variant="z-reveal" delay={0.1} duration={0.9}>
              <GlassCard
                className="max-w-md mx-auto lg:mx-0"
                accentColor="rgba(0, 210, 255, 0.25)"
              >
                <div className="aspect-[4/5] rounded-3xl relative overflow-hidden">
                  <motion.img
                    src="/profile.png"
                    alt="Fatlind Azemi"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
 
          {/* Text content */}
          <div className="order-1 lg:order-2">
            <ScrollReveal variant="slide-up" delay={0.1}>
              <span className="eyebrow mb-4 block">{t("about.eyebrow")}</span>
            </ScrollReveal>
 
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 lg:mb-8">
              <AnimatedText
                key={`about-heading-${locale}`}
                text={t("about.heading")}
                delay={0}
                stagger={0.03}
              />
            </h2>
 
            <ScrollReveal variant="slide-up" delay={0.2}>
              <div className="space-y-5 text-white/90 text-lg md:text-xl leading-relaxed max-w-xl mb-6">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
              </div>
            </ScrollReveal>

            {/* Education section - clean hairline border wrapper */}
            <ScrollReveal variant="slide-up" delay={0.25}>
              <div className="border-y border-white/10 py-6 my-8 max-w-xl text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 block">
                  {t("about.educationLabel")}
                </span>
                <ul className="space-y-4 font-sans text-sm text-white/75">
                  {education.map((item, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                      <span className="font-mono text-white/60 shrink-0 min-w-[130px]">
                        {item.period}
                      </span>
                      <div>
                        <span className="font-semibold text-white/90">{item.institution}</span>
                        <span className="text-white/40 mx-2">·</span>
                        <span className="text-white/80">{item.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
 
            {/* Open Statistics */}
            <ScrollReveal variant="slide-up" delay={0.3}>
              <div className="grid grid-cols-3 gap-6 max-w-xl pt-2">
                {stats.map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-widest leading-tight mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
