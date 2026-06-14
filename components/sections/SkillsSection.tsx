"use client";

import { useRef } from "react";
import AnimatedText from "../AnimatedText";
import GlassCard from "../GlassCard";
import ZReveal, { ZRevealItem } from "../ZReveal";
import ScrollReveal from "../ScrollReveal";
import ParallaxLayer from "../ParallaxLayer";
import { useScrollTimeline } from "../../hooks/useScrollTimeline";
import {
  Cloud,
  Database,
  BrainCircuit,
  Code2,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const mainSkills = [
  {
    icon: Cloud,
    title: "Data Engineering & Cloud",
    accent: "rgba(0, 162, 255, 0.35)",
    description:
      "Data Warehouses, Data Lakes und Medallion-Architekturen. Robuste Exportstrecken und ETL/ELT-Pipelines in Azure und GCP.",
    tags: ["Azure Data Factory", "Synapse Analytics", "Azure SQL", "BigQuery", "App Engine"],
  },
  {
    icon: BrainCircuit,
    title: "Databricks & ML/AI",
    accent: "rgba(255, 54, 0, 0.35)",
    description:
      "Enrichment-Pipelines, AutoML-Feature-Generierung und MLflow-Tracking. Produktive Übergabe in Databricks Jobs und NLP-Trendanalysen.",
    tags: ["Databricks", "AutoML", "MLflow", "PySpark", "NLP"],
  },
  {
    icon: ShieldCheck,
    title: "AI Governance & Tooling",
    accent: "rgba(167, 139, 250, 0.35)",
    description:
      "Governance-Frameworks für KI-Projekte: Guardrails, Prompt-Linting, CI/CD-Review-Gates sowie Prompting-Kataloge und Copilot-Templates.",
    tags: ["AI Governance", "Guardrails", "Prompt-Linting", "CI/CD Gates", "Copilot"],
  },
];

const secondarySkills = [
  {
    icon: Code2,
    title: "Programmierung",
    accent: "rgba(244, 114, 182, 0.3)",
    tags: ["Python", "PySpark", "T-SQL", "Java", "JavaScript", "Bash"],
  },
  {
    icon: Database,
    title: "Datenbanken",
    accent: "rgba(16, 185, 129, 0.3)",
    tags: ["MS SQL", "Synapse", "PostgreSQL", "MongoDB", "Cassandra", "Neo4j"],
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    accent: "rgba(251, 191, 36, 0.3)",
    tags: ["Power BI", "Looker", "Data Studio", "Jupyter", "Tabular Editor", "Visio"],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainCardsRef = useRef<HTMLDivElement>(null);
  const secondaryCardsRef = useRef<HTMLDivElement>(null);

  useScrollTimeline(
    {
      trigger: sectionRef,
      start: "top bottom",
      end: "center center",
      scrub: 1,
      builder: (tl) => {
        if (mainCardsRef.current) {
          tl.fromTo(
            mainCardsRef.current.children,
            { y: 100, opacity: 0.4, rotateX: 8 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power2.out",
            },
            0
          );
        }
        if (secondaryCardsRef.current) {
          tl.fromTo(
            secondaryCardsRef.current.children,
            { y: 70, opacity: 0.4 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.35
          );
        }
      },
    },
    []
  );

  return (
    <section ref={sectionRef} id="skills" className="section py-28 md:py-36">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal variant="slide-up" delay={0.1}>
            <span className="eyebrow mb-4 block">Expertise</span>
          </ScrollReveal>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 md:mb-6">
            <AnimatedText text="Skills & Tech Stack" stagger={0.03} />
          </h2>

          <ScrollReveal variant="slide-up" delay={0.2}>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
              Technologien und Frameworks, mit denen ich Enterprise-Datenlandschaften baue und optimiere.
            </p>
          </ScrollReveal>
        </div>

        {/* Main skill cards: generous gaps, protected by glass tint */}
        <ParallaxLayer speed={0.12} yOffset={50} className="relative z-10">
          <div ref={mainCardsRef}>
            <ZReveal
              staggerChildren
              stagger={0.12}
              delay={0.2}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-10 md:mb-14"
            >
              {mainSkills.map((skill, i) => (
                <ZRevealItem key={i}>
                  <GlassCard accentColor={skill.accent} className="group h-full">
                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${skill.accent.replace("0.35", "0.12")}` }}
                        >
                          <skill.icon className="w-6 h-6" style={{ color: skill.accent.replace("0.35", "0.9") }} />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white">{skill.title}</h3>
                      </div>

                      <p className="text-white/55 text-sm md:text-base leading-relaxed mb-8">
                        {skill.description}
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {skill.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-mono text-white/80 border border-white/[0.08] bg-white/[0.05]"
                          >
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
        </ParallaxLayer>

        {/* Secondary skill cards */}
        <ParallaxLayer speed={0.08} yOffset={30} className="relative z-10">
          <div ref={secondaryCardsRef}>
            <ZReveal
              staggerChildren
              stagger={0.1}
              delay={0.4}
              className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8"
            >
              {secondarySkills.map((skill, i) => (
                <ZRevealItem key={i}>
                  <GlassCard accentColor={skill.accent} className="group h-full">
                    <div className="p-7 md:p-9">
                      <div className="flex items-center gap-3 mb-5">
                        <skill.icon className="w-5 h-5" style={{ color: skill.accent.replace("0.3", "0.9") }} />
                        <h3 className="text-base font-semibold text-white">{skill.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 rounded-full text-[10px] md:text-[11px] font-mono text-white/70 border border-white/[0.07] bg-white/[0.04]"
                          >
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
        </ParallaxLayer>

        {/* Certifications line */}
        <ScrollReveal variant="fade" delay={0.6} className="mt-14 md:mt-18 flex flex-wrap items-center justify-center gap-3">
          <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Zertifiziert:</span>
          <span className="px-4 py-2 rounded-full text-xs font-medium text-white/85 border border-white/[0.08] bg-white/[0.04]">
            Google Professional Data Engineer
          </span>
          <span className="px-4 py-2 rounded-full text-xs font-medium text-white/85 border border-white/[0.08] bg-white/[0.04]">
            Databricks Certified Data Engineer Associate
          </span>
        </ScrollReveal>
      </div>
    </section>
  );
}
