import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../../hooks/useMagnetic';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
}

export default function MagneticWrapper({
  children,
  strength,
  radius,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const magneticStyle = useMagnetic(ref, { strength, radius });

  return (
    <motion.div ref={ref} style={magneticStyle} className="inline-block">
      {children}
    </motion.div>
  );
}
