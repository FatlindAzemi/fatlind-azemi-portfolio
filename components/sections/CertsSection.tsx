"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import ZReveal, { ZRevealItem } from "../ZReveal";
import ScrollReveal from "../ScrollReveal";
import ParallaxLayer from "../ParallaxLayer";
import { useScrollTimeline } from "../../hooks/useScrollTimeline";
import SketchFrame from "../SketchFrame";

const certs = [
  {
    letter: "G",
    issuer: "Google Cloud",
    title: "Professional Data Engineer",
    description: "Design und Bau skalierbarer Data-Engineering-Systeme auf GCP.",
    color: "#4285f4",
    accent: "rgba(66, 133, 244, 0.45)",
  },
  {
    letter: "D",
    issuer: "Databricks",
    title: "Certified Data Engineer Associate",
    description: "Delta Lake, Spark, Pipelines und Production-Deployments.",
    color: "#ff3600",
    accent: "rgba(255, 54, 0, 0.45)",
  },
];

export default function CertsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollTimeline(
    {
      trigger: sectionRef,
      start: "top bottom",
      end: "center center",
      scrub: 1,
      builder: (tl) => {
        if (cardsRef.current) {
          tl.fromTo(
            cardsRef.current.children,
            { y: 120, opacity: 0.3, rotateY: -12, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              rotateY: 0,
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out",
            },
            0
          );
        }
      },
    },
    []
  );

  return (
    <section ref={sectionRef} id="certs" className="section min-h-screen py-28 md:py-36">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="slide-up" delay={0.1}>
          <span className="eyebrow mb-4 block">Zertifizierungen</span>
        </ScrollReveal>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 md:mb-6">
          <AnimatedText text="Verifiziertes Wissen" stagger={0.03} />
        </h2>

        <ScrollReveal variant="slide-up" delay={0.2}>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16">
            Offiziell zertifiziert in den beiden führenden Data-Engineering-Plattformen.
          </p>
        </ScrollReveal>

        <ParallaxLayer speed={0.1} yOffset={40} className="relative z-10">
          <div ref={cardsRef}>
            <ZReveal
              staggerChildren
              stagger={0.15}
              delay={0.3}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
            >
              {certs.map((cert, i) => (
                <ZRevealItem key={i}>
                  <GlassCard accentColor={cert.accent} className="group relative h-full">
                    <div className="p-9 md:p-12 flex flex-col items-center text-center relative">
                      {/* Glowing certificate frame accent */}
                      <div className="absolute top-0 right-0 opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none">
                        <SketchFrame size={80} color={cert.color} strokeWidth={1} />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-26 h-26 md:w-32 md:h-32 mb-8 md:mb-10 rounded-2xl flex items-center justify-center border-2"
                        style={{
                          backgroundColor: `${cert.color}15`,
                          borderColor: `${cert.color}40`,
                          boxShadow: `0 0 50px ${cert.color}30`,
                        }}
                      >
                        <span
                          className="text-4xl md:text-5xl font-bold"
                          style={{ color: cert.color }}
                        >
                          {cert.letter}
                        </span>
                      </motion.div>

                      <p className="eyebrow mb-3" style={{ color: cert.color }}>
                        {cert.issuer}
                      </p>

                      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-3 md:mb-4">
                        {cert.title}
                      </h3>

                      <p className="text-white/55 text-sm md:text-base max-w-xs">
                        {cert.description}
                      </p>

                      <div className="mt-9 pt-7 border-t border-white/[0.08] w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-white/35">
                        <span>Verifiziert</span>
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }} />
                          Aktiv
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </ZRevealItem>
              ))}
            </ZReveal>
          </div>
        </ParallaxLayer>
      </div>
    </section>
  );
}
