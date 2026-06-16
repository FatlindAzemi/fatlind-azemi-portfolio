"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import ZReveal, { ZRevealItem } from "../ZReveal";
import ScrollReveal from "../ScrollReveal";
import { useLanguage } from "../LanguageProvider";
import { t, getCerts } from "@/lib/i18n";
import SketchFrame from "../SketchFrame";

export default function CertsSection() {
  const { locale } = useLanguage();

  const certs = getCerts(locale);

  return (
    <section id="certs" className="section">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="slide-up" delay={0.1}>
          <span className="eyebrow mb-4 block">{t(locale, "certs.eyebrow")}</span>
        </ScrollReveal>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 md:mb-6">
          <AnimatedText text={t(locale, "certs.heading")} stagger={0.03} />
        </h2>

        <ScrollReveal variant="slide-up" delay={0.2}>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16">
            {t(locale, "certs.subtitle")}
          </p>
        </ScrollReveal>

        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <ZReveal
            staggerChildren
            stagger={0.18}
            delay={0.3}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 text-center justify-items-center"
          >
            {certs.map((cert, i) => (
              <ZRevealItem key={i} className="w-full flex flex-col items-center justify-center">
                <GlassCard accentColor={cert.accent} className="group relative h-full w-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="p-8 sm:p-10 flex flex-col items-center gap-6 relative h-full text-center">
                    {/* Glowing certificate frame accent */}
                    <div className="absolute top-0 right-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                      <SketchFrame size={80} color={cert.color} strokeWidth={1} />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border border-white/10 overflow-hidden bg-white/5 flex-shrink-0 transition-shadow duration-500 group-hover:shadow-2xl"
                      style={{
                        boxShadow: `0 0 30px ${cert.color}30`,
                      }}
                    >
                      <Image
                        src={cert.imageSrc}
                        alt={cert.title}
                        width={112}
                        height={112}
                        className="object-contain p-2"
                        loading="eager"
                      />
                    </motion.div>

                    <div className="flex-1 flex flex-col justify-between h-full w-full items-center">
                      <div className="flex flex-col items-center">
                        <p className="eyebrow mb-2" style={{ color: cert.color }}>
                          {cert.issuer}
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                          {cert.title}
                        </h3>

                        <p className="text-white/90 text-base md:text-lg leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-white/[0.08] w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-white/40">
                        <span>{t(locale, "certs.verified")}</span>
                        <span className="flex items-center gap-1.5 text-white/70">
                          <span className="w-1.5 h-1.5 rounded-full status-pulse-dot" style={{ backgroundColor: cert.color }} />
                          {t(locale, "certs.active")}
                        </span>
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
