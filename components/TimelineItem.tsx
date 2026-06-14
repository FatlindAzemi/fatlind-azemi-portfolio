"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  period: string;
  title: string;
  company: string;
  description: string[];
  index: number;
}

export default function TimelineItem({
  period,
  title,
  company,
  description,
  index,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 md:pl-10 pb-10 last:pb-0"
    >
      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-azure shadow-[0_0_12px_rgba(0,162,255,0.6)]" />
      <div className="absolute left-[4px] top-5 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />

      <div className="rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-4 md:p-5">
        <span className="eyebrow mb-1.5 block">{period}</span>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-white/50 text-sm mb-3">{company}</p>

        <ul className="space-y-1.5">
          {description.map((item, i) => (
            <li key={i} className="text-white/60 text-sm leading-relaxed flex items-start gap-2.5">
              <span className="mt-2 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
