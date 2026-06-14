"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import ZReveal, { ZRevealItem } from "../ZReveal";
import DataLine from "../DataLine";
import ParallaxLayer from "../ParallaxLayer";
import ScrollReveal from "../ScrollReveal";
import { useLanguage } from "../LanguageProvider";
import { useScrollTimeline } from "../../hooks/useScrollTimeline";
import { Cloud, Award, Briefcase } from "lucide-react";

const iconMap = {
  Briefcase,
  Cloud,
  Award,
};

export default function AboutSection() {
  const { t, locale } = useLanguage();
  const stats = [
    { iconKey: "Briefcase" as const, label: t("about.stats.experience"), value: "4+" },
    { iconKey: "Cloud" as const, label: t("about.stats.platforms"), value: "Azure / GCP" },
    { iconKey: "Award" as const, label: t("about.stats.certs"), value: "2" },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useScrollTimeline(
    {
      trigger: sectionRef,
      start: "top bottom",
      end: "center center",
      scrub: 1,
      builder: (tl, trigger) => {
        if (profileRef.current) {
          tl.fromTo(
            profileRef.current,
            { y: 80, opacity: 0.6, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
            0
          );
        }
        if (statsRef.current) {
          tl.fromTo(
            statsRef.current,
            { y: 60, opacity: 0.6 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
            0.2
          );
        }
      },
    },
    []
  );

  return (
    <section ref={sectionRef} id="about" className="section overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background data line passes safely behind the protected glass layer */}
        <ParallaxLayer
          speed={-0.3}
          yOffset={40}
          opacityRange={[0.3, 0.8, 0.8, 0.3]}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-32 pointer-events-none"
        >
          <DataLine color="rgba(0, 210, 255, 0.35)" className="w-full h-full" />
        </ParallaxLayer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Profile card */}
          <div ref={profileRef} className="order-2 lg:order-1 relative">
            <GlassCard
              className="max-w-md mx-auto lg:mx-0"
              accentColor="rgba(0, 210, 255, 0.25)"
            >
              <div className="aspect-[4/5] rounded-3xl relative overflow-hidden">
                <img
                  src="/profile.png"
                  alt="Fatlind Azemi"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03040b]/60 via-transparent to-transparent" />
              </div>
            </GlassCard>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 md:right-2 w-14 h-14 opacity-70"
            >
              <GlassCard
                className="w-full h-full flex items-center justify-center"
                accentColor="rgba(0, 210, 255, 0.15)"
                hover3d={false}
              >
                <Cloud className="w-6 h-6 text-azure" />
              </GlassCard>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-6 md:left-2 w-12 h-12 opacity-70"
            >
              <GlassCard
                className="w-full h-full flex items-center justify-center"
                accentColor="rgba(255, 54, 0, 0.15)"
                hover3d={false}
              >
                <Award className="w-5 h-5 text-databricks" />
              </GlassCard>
            </motion.div>
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
              <div className="space-y-5 text-white/55 text-base md:text-lg leading-relaxed max-w-xl mb-10 lg:mb-12">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
              </div>
            </ScrollReveal>

            {/* Milestone sub-grid */}
            <div ref={statsRef}>
              <ZReveal
                staggerChildren
                stagger={0.12}
                delay={0.3}
                className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6"
              >
                {stats.map((stat, i) => {
                  const Icon = iconMap[stat.iconKey];
                  return (
                    <ZRevealItem key={i}>
                      <GlassCard
                        className="text-center h-full"
                        accentColor="rgba(0, 210, 255, 0.18)"
                        hover3d={false}
                      >
                        <div className="py-5 px-3">
                          <Icon className="w-6 h-6 mx-auto mb-4 text-azure" />
                          <div className="text-xl md:text-2xl font-bold text-white mb-2">
                            {stat.value}
                          </div>
                          <div className="text-[10px] md:text-xs text-white/50 font-mono uppercase tracking-wider leading-tight">
                            {stat.label}
                          </div>
                        </div>
                      </GlassCard>
                    </ZRevealItem>
                  );
                })}
              </ZReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
