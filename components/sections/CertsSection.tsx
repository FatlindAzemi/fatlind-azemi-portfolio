"use client";

import { MouseEvent } from "react";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import AnimatedText from "../AnimatedText";
import ZReveal, { ZRevealItem } from "../ZReveal";
import ScrollReveal from "../ScrollReveal";
import { useLanguage } from "../LanguageProvider";
import { t, getCerts } from "@/lib/i18n";
import SketchFrame from "../SketchFrame";

function CredentialTiltCard({ children, accent }: { children: React.ReactNode; accent: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glintX = useMotionValue(0);
  const glintY = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const rx = useSpring(rotateX, { stiffness: 100, damping: 25, mass: 0.8 });
  const ry = useSpring(rotateY, { stiffness: 100, damping: 25, mass: 0.8 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(window.innerWidth < 768 ? 0 : (event.clientX - rect.left) / rect.width - 0.5);
    y.set(window.innerWidth < 768 ? 0 : (event.clientY - rect.top) / rect.height - 0.5);
    glintX.set(event.clientX - rect.left);
    glintY.set(event.clientY - rect.top);
  }

  return (
    <div style={{ perspective: "1500px" }} className="w-full h-full flex justify-center">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.005] p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/15 hover:shadow-3xl group w-full text-center flex flex-col items-center justify-between"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${glintX}px ${glintY}px,
                ${accent}1a,
                transparent 65%
              )
            `,
          }}
        />
        <div style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }} className="w-full flex flex-col items-center h-full justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function CertsSection() {
  const { locale } = useLanguage();
  const certs = getCerts(locale);

  return (
    <section id="certs" className="section py-20">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="slide-up" delay={0.1}>
          <span className="eyebrow mb-4 block tracking-[0.2em]">{t(locale, "certs.eyebrow")}</span>
        </ScrollReveal>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6">
          <AnimatedText text={t(locale, "certs.heading")} stagger={0.03} />
        </h2>

        <ScrollReveal variant="slide-up" delay={0.2}>
          <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mb-16 font-light">
            {t(locale, "certs.subtitle")}
          </p>
        </ScrollReveal>

        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <ZReveal staggerChildren stagger={0.18} delay={0.3} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 justify-items-center">
            {certs.map((cert, i) => (
              <ZRevealItem key={i} className="w-full flex">
                <CredentialTiltCard accent={cert.color}>
                  
                  {/* Hex-Dekor im Hintergrund */}
                  <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                    <SketchFrame size={70} color={cert.color} strokeWidth={1} />
                  </div>

                  <div className="flex flex-col items-center w-full">
                    {/* Badge Container */}
                    <div 
                      className="w-24 h-24 rounded-2xl flex items-center justify-center border border-white/5 bg-white/[0.01] overflow-hidden flex-shrink-0 transition-transform duration-500 group-hover:scale-105 mb-6"
                      style={{ boxShadow: `0 10px 30px ${cert.color}15` }}
                    >
                      <Image
                        src={cert.imageSrc}
                        alt={cert.title}
                        width={96}
                        height={96}
                        className="object-contain p-3 filter contrast-[1.05]"
                        loading="eager"
                      />
                    </div>

                    <p className="text-[10px] font-mono tracking-widest uppercase mb-2" style={{ color: cert.color }}>
                      // {cert.issuer}
                    </p>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight max-w-sm">
                      {cert.title}
                    </h3>

                    <p className="text-white/50 text-sm sm:text-base font-light leading-relaxed max-w-md">
                      {cert.description}
                    </p>
                  </div>

                  {/* Verification Bar */}
                  <div className="mt-8 pt-4 border-t border-white/5 w-full flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-white/30">
                    <span>{t(locale, "certs.verified")}</span>
                    <span className="flex items-center gap-1.5 text-white/60">
                      <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: cert.color }} />
                      {t(locale, "certs.active")}
                    </span>
                  </div>

                </CredentialTiltCard>
              </ZRevealItem>
            ))}
          </ZReveal>
        </div>
      </div>
    </section>
  );
}
