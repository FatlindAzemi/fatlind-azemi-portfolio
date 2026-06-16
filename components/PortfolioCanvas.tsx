"use client";

import React, { Component, ErrorInfo, ReactNode, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { t } from "@/lib/i18n";
import Scene from "./Scene";

interface BoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  public state: BoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): BoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WebGL initialization error intercepted:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Reads the page scroll progress directly as a Framer/R3F MotionValue and feeds
 * it into the 3D scene. Keeping the scroll value as a MotionValue (instead of
 * React state) means scrolling never re-renders this component or its parents.
 */
function ScrollingScene() {
  // useScroll from R3F measures page scroll and returns a MotionValue — no
  // React state, no per-frame re-render of the React tree.
  const { scrollYProgress } = useScroll();
  return (
    <Suspense fallback={null}>
      <Scene scrollProgress={scrollYProgress} />
    </Suspense>
  );
}

export default function PortfolioCanvas() {
  // State initialization starts as false to match server HTML exactly.
  // useEffect runs after hydration and flips it to true, starting the canvas loading correctly.
  const [mounted, setMounted] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause rendering when the tab is hidden to save GPU/battery.
  const [tabHidden, setTabHidden] = useState(false);
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 w-full h-full bg-background flex flex-col items-center justify-center gap-4 z-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-azure/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-azure border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="text-gray-400 text-xs font-mono tracking-widest uppercase animate-pulse">
          {t(locale, "loading.scene")}
        </p>
      </div>
    );
  }

  const fallbackBackground = (
    <div className="fixed inset-0 w-full h-full z-0 mobile-bg" />
  );

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-background">
      <WebGLErrorBoundary fallback={fallbackBackground}>
        <Canvas
          // Clamp device pixel ratio: at Retina/4K the unclamped DPR makes the
          // Bloom postprocessing chain do 2-3x fragment work for no perceptible
          // gain. [1, 1.5] keeps it crisp without tanking FPS.
          dpr={[1, 1.5]}
          // Only render when the tab is visible; "demand" lets the frameloop idle
          // when nothing animates (e.g. reduced-motion users, off-screen state).
          frameloop={tabHidden ? "never" : "always"}
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ touchAction: "auto" }}
          eventSource={typeof document !== "undefined" ? document.body : undefined}
        >
          <fog attach="fog" args={["#03040b", 12, 50]} />
          <ScrollingScene />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
