"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, Shield, Layers, Award, Cloud, MoveRight } from "lucide-react";

interface OverlayProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

const BlurRevealText = ({ 
  text, 
  className = "", 
  delay = 0,
  stagger = 0.04
}: { 
  text: string, 
  className?: string,
  delay?: number,
  stagger?: number
}) => {
  const words = text.split(" ");
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
      }}
      className={`flex flex-wrap justify-center ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-1">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.9 },
              visible: { 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)", 
                scale: 1,
                transition: { type: "spring", damping: 14, stiffness: 100 } 
              },
              exit: { 
                opacity: 0, 
                y: -20, 
                filter: "blur(8px)",
                transition: { duration: 0.3 }
              }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default function Overlay({ activeSection, onNavigate }: OverlayProps) {
  const sections = [
    {
      id: "hero",
      navLabel: "Intro",
      icon: <Cpu className="w-5 h-5 text-white/80" />,
      title: "Fatlind Azemi",
      subtitle: "Senior Cloud Data Engineer & AI Expert.",
      description: null,
      tags: ["Azure & Databricks", "AI-Driven Analytics", "MLOps & Governance"],
    },
    {
      id: "data-engineering",
      navLabel: "Data Eng.",
      icon: <Cloud className="w-5 h-5 text-white/80" />,
      title: "Data Engineering",
      subtitle: "Skalierbare Infrastrukturen & Pipelines",
      description: "Ich entwickle und optimiere hochperformante Data Warehouses, Data Lakes und Medallion-Architekturen. Mein Fokus liegt auf dem Aufbau robuster ETL/ELT-Strecken für Enterprise-Lösungen (Azure & GCP).",
    },
    {
      id: "databricks-ai",
      navLabel: "AI & ML",
      icon: <Database className="w-5 h-5 text-white/80" />,
      title: "Databricks & AI",
      subtitle: "Advanced Analytics & Model Training",
      description: "Meine Expertise umfasst die Konstruktion intelligenter Data-Enrichment-Pipelines. Ich implementiere AutoML-Lösungen, trainiere Baseline-Modelle und sichere deren Lebenszyklus durch striktes MLflow-Tracking ab.",
    },
    {
      id: "governance",
      navLabel: "Governance",
      icon: <Shield className="w-5 h-5 text-white/80" />,
      title: "AI Governance",
      subtitle: "Sicherheit, Guardrails & Review Gates",
      description: "Sicherheit steht an erster Stelle. Ich konzipiere Governance-Frameworks für KI-Initiativen, entwickle Prompting-Kataloge und etabliere Copilot-Instruction-Templates, um Enterprise-Standards zu wahren.",
    },
    {
      id: "tech-stack",
      navLabel: "Tech Stack",
      icon: <Layers className="w-5 h-5 text-white/80" />,
      title: "Technologien",
      subtitle: "Datenbanken, Reporting & Code",
      description: "Tiefgehende Erfahrung mit Python, PySpark und T-SQL. Ich administriere relationale sowie NoSQL-Datenbanken und visualisiere komplexe Datenlandschaften durch interaktive Power BI Dashboards.",
    },
    {
      id: "about-certs",
      navLabel: "Über mich",
      icon: <Award className="w-5 h-5 text-white/80" />,
      // Rendered custom below
      title: "",
      subtitle: "",
      description: "",
    }
  ];

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-6 md:p-12 font-sans">
      {/* Header */}
      <header className="w-full flex justify-between items-center pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate(0)}
        >
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black transition-all duration-500">
            <span className="text-xs font-black tracking-tighter">FA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-white uppercase">Fatlind Azemi</span>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.1 }}
          className="flex items-center gap-6 hidden sm:flex"
        >
          {['LinkedIn', 'GitHub', 'Email'].map((item) => (
            <a 
              key={item}
              href="#" 
              className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-grow relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[800px] h-[400px] bg-black/60 blur-[100px] rounded-[100%]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center text-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {sections.map((section, idx) => {
              if (activeSection !== idx) return null;

              // Custom Layout for Last Section (About & Certs)
              if (idx === 5) {
                return (
                  <motion.div
                    key={section.id}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col md:flex-row items-center justify-center gap-12"
                  >
                    {/* Profile Placeholder */}
                    <motion.div 
                      initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="relative w-64 h-80 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex-shrink-0 group"
                    >
                      {/* TODO: Add actual profile picture here */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 rounded-full border border-dashed border-white/30 flex items-center justify-center mb-4">
                          <span className="text-white/50 text-2xl font-light">+</span>
                        </div>
                        <span className="text-xs font-mono tracking-widest text-white/50 uppercase">Insert Photo</span>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div 
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
                      className="flex flex-col items-start text-left max-w-lg"
                    >
                      <div className="mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center">
                          {section.icon}
                        </div>
                        <span className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase">
                          Phase 0{idx}
                        </span>
                      </div>
                      
                      <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-4 leading-tight">
                        Bereit für die Zukunft der Daten.
                      </h1>
                      
                      <p className="text-white/50 text-sm md:text-base leading-relaxed font-normal mb-8">
                        Als zertifizierter Data Engineer (Google Cloud & Databricks) verbinde ich tiefe technische Expertise mit einem klaren Verständnis für Business-Anforderungen. Die im Hintergrund schwebenden Badges stehen für verifiziertes Wissen – doch der wahre Wert liegt in der praktischen Umsetzung skalierbarer KI- und Daten-Ökosysteme.
                      </p>

                      <button className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 hover:bg-gray-200 transition-all duration-300 flex items-center gap-3">
                        Let&apos;s Connect <MoveRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </motion.div>
                );
              }

              // Default Typography Layout
              return (
                <motion.div
                  key={section.id}
                  className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="mb-8 flex flex-col items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                      {section.icon}
                    </div>
                    {idx > 0 && (
                      <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">
                        Phase 0{idx}
                      </span>
                    )}
                  </motion.div>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-6 leading-[1.1] text-balance">
                    <BlurRevealText text={section.title} delay={0.1} />
                  </h1>

                  <h2 className="text-lg md:text-2xl font-light tracking-tight text-white/60 mb-8 max-w-2xl text-balance">
                    <BlurRevealText text={section.subtitle} delay={0.3} stagger={0.02} />
                  </h2>

                  {idx === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                      className="flex gap-3 justify-center flex-wrap mt-4"
                    >
                      {section.tags?.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-5 py-2 rounded-full text-xs font-mono tracking-wider text-white/50 border border-white/10 bg-white/5 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                      className="text-white/40 text-sm md:text-base leading-relaxed font-normal max-w-xl text-balance"
                    >
                      {section.description}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Persistent Side Navigation */}
      <nav className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 pointer-events-auto z-20 hidden sm:flex flex-col gap-6">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(idx)}
            className="group flex items-center justify-end gap-4"
          >
            <span className={`text-[10px] font-mono tracking-widest transition-all duration-300 uppercase ${activeSection === idx ? 'text-white/80' : 'text-white/0 group-hover:text-white/40 translate-x-4 group-hover:translate-x-0'}`}>
              {section.navLabel}
            </span>
            <div className={`w-1 transition-all duration-500 rounded-full ${
              activeSection === idx ? "h-8 bg-white" : "h-2 bg-white/20 group-hover:bg-white/40 group-hover:h-4"
            }`} />
          </button>
        ))}
      </nav>

      {/* Global Scroll Indicator (Bottom Center) */}
      <AnimatePresence>
        {activeSection < 5 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          >
            <span className="text-[9px] tracking-[0.3em] text-white/40 font-mono uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-12 rounded-full border border-white/20 flex justify-center p-1"
            >
              <div className="w-1 h-3 bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
