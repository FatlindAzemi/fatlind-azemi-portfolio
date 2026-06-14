"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Scene from "./Scene";

interface PortfolioCanvasProps {
  scrollProgress: number;
}

export default function PortfolioCanvas({ scrollProgress }: PortfolioCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 w-full h-full bg-[#03040b] flex flex-col items-center justify-center gap-4 z-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-azure/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-azure border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="text-gray-400 text-xs font-mono tracking-widest uppercase animate-pulse">Lade 3D Welt...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-[#03040b]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: 'auto' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
      >
        <fog attach="fog" args={["#03040b", 12, 50]} />
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
