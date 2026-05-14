import { useRef } from 'react';
import { useInView } from 'framer-motion';
import CurtainReveal from './CurtainReveal';

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
}

export default function SectionTransition({
  children,
  id,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section ref={ref} id={id}>
      <CurtainReveal isVisible={inView}>{children}</CurtainReveal>
    </section>
  );
}
