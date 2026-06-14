"use client";

import { useRef } from "react";
import AnimatedText from "../AnimatedText";
import MagneticButton from "../MagneticButton";
import GlassCard from "../GlassCard";
import ZReveal, { ZRevealItem } from "../ZReveal";
import ScrollReveal from "../ScrollReveal";
import ParallaxLayer from "../ParallaxLayer";
import { useScrollTimeline } from "../../hooks/useScrollTimeline";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

interface ContactLink {
  icon: LucideIcon | React.FC<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}

const contactLinks: ContactLink[] = [
  { icon: Mail, label: "E-Mail", value: "fatlindazemi@gmail.com", href: "mailto:fatlindazemi@gmail.com" },
  { icon: Phone, label: "Telefon", value: "+49 160 92225626", href: "tel:+4916092225626" },
  { icon: MapPin, label: "Standort", value: "Bielefeld, Deutschland", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/fatlindazemi", href: "#" },
  { icon: GithubIcon, label: "GitHub", value: "github.com/fatlindazemi", href: "#" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useScrollTimeline(
    {
      trigger: sectionRef,
      start: "top bottom",
      end: "center center",
      scrub: 1,
      builder: (tl) => {
        if (footerRef.current) {
          tl.fromTo(
            footerRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            0.5
          );
        }
      },
    },
    []
  );

  return (
    <section ref={sectionRef} id="contact" className="section py-28 md:py-36">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="slide-up" delay={0.1}>
          <span className="eyebrow mb-4 block">Kontakt</span>
        </ScrollReveal>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-4 md:mb-6">
          <AnimatedText text="Lass uns reden" stagger={0.03} />
        </h2>

        <ScrollReveal variant="slide-up" delay={0.2}>
          <p className="text-white/55 text-base md:text-xl max-w-2xl mx-auto mb-12 md:mb-16">
            Ob neue Herausforderungen im Data Engineering, KI-Projekte oder spannende Diskussionen über skalierbare Datenarchitekturen – ich freue mich auf deine Nachricht.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="slide-up" delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mb-14 md:mb-20">
          <MagneticButton href="mailto:fatlindazemi@gmail.com" variant="primary" className="!px-10 !py-4 text-base min-w-[180px]">
            <Mail className="w-5 h-5" /> E-Mail senden
          </MagneticButton>
          <MagneticButton href="#" variant="outline" className="!px-10 !py-4 text-base min-w-[180px]">
            <LinkedinIcon className="w-5 h-5" /> LinkedIn
          </MagneticButton>
        </ScrollReveal>

        {/* Minimal grid footer: sequential fade in from dark space */}
        <ParallaxLayer speed={0.1} yOffset={30} className="relative z-10">
          <ZReveal
            staggerChildren
            stagger={0.1}
            delay={0.4}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-4xl mx-auto mb-16 md:mb-24"
          >
            {contactLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <ZRevealItem key={i}>
                  <a href={link.href} className="block group h-full">
                    <GlassCard className="h-full" accentColor="rgba(255,255,255,0.12)" hover3d={false}>
                      <div className="p-6 md:p-7 flex items-center gap-4 text-left">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.07]">
                          <Icon className="w-5 h-5 text-white/65 group-hover:text-azure transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-white/45 mb-1">{link.label}</p>
                          <p className="text-sm text-white/90 group-hover:text-white transition-colors truncate">{link.value}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </a>
                </ZRevealItem>
              );
            })}
          </ZReveal>
        </ParallaxLayer>

        <div ref={footerRef}>
          <ZReveal delay={0.8}>
            <div className="pt-8 border-t border-white/10">
              <p className="text-white/35 text-xs md:text-sm">
                © {new Date().getFullYear()} Fatlind Azemi. Senior Cloud Data Engineer & AI Expert.
              </p>
            </div>
          </ZReveal>
        </div>
      </div>
    </section>
  );
}
