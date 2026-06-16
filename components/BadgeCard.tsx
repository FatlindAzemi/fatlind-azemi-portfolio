"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";
import { useLanguage } from "./LanguageProvider";

interface BadgeCardProps {
  position: [number, number, number];
  title: string;
  issuer: string;
  imageSrc: string;
  accentColor: string;
  scrollProgress: MotionValue<number>;
}

export default function BadgeCard({ position, title, issuer, imageSrc, accentColor, scrollProgress }: BadgeCardProps) {
  const { locale } = useLanguage();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  // Ref-backed spotlight position: avoids a per-mousemove React state update
  // (which would re-render this DOM subtree, embedded inside the WebGL canvas,
  // on every frame the cursor is over the card).
  const spotlightRef = useRef<HTMLDivElement>(null);
  // Card root ref so we can drive visibility/opacity from useFrame without a
  // React state update (scrollProgress is a MotionValue, read per-frame).
  const cardRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Visibility from scroll, computed per-frame.
    const opacity = Math.max(0, Math.min(1, (scrollProgress.get() - 0.8) * 6));
    const isVisible = opacity > 0;

    if (cardRef.current) {
      cardRef.current.style.opacity = String(opacity);
      cardRef.current.style.display = isVisible ? "flex" : "none";
      cardRef.current.style.pointerEvents = isVisible ? "auto" : "none";
    }

    if (!isVisible) return;

    if (hovered) {
      const targetY = state.pointer.x * 0.3;
      const targetX = -state.pointer.y * 0.3;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);

      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.05, 0.1));
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2] + 0.5, 0.1);
    } else {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.05);

      groupRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.1;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2], 0.05);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.0, 0.05));
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Html
        transform
        distanceFactor={4.5}
        position={[0, 0, 0]}
      >
        <div
          ref={cardRef}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            // Direct style mutation via ref — no React state, no re-render.
            if (spotlightRef.current) {
              spotlightRef.current.style.background =
                `radial-gradient(800px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.06), transparent 40%)`;
            }
          }}
          // backdrop-blur-3xl (64px) on a WebGL-embedded Html transform was the
          // single most expensive composite path on the site. Using a solid
          // smoky background instead keeps the premium look without re-rasterizing
          // the blurred background every animation frame.
          className="w-[340px] h-[460px] rounded-[32px] bg-surface/85 border p-8 flex flex-col justify-between items-center text-center transition-all duration-500 relative overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] cursor-pointer"
          style={{
            borderColor: hovered ? accentColor : "rgba(255, 255, 255, 0.08)",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
            opacity: 0,
          }}
        >
          {/* Spotlight background (ref-mutated on mousemove) */}
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
            style={{ opacity: hovered ? 1 : 0 }}
          />

          <div className="relative z-10 w-full h-full flex flex-col justify-between items-center">
            {/* Subtle Ambient light strip at top */}
            <div
              className="absolute top-0 left-0 w-full h-[3px] opacity-75"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
            />

            <div className="flex flex-col items-center gap-3 mt-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">{issuer}</span>
              <div className="h-[1px] w-12 rounded" style={{ backgroundColor: accentColor, opacity: 0.5 }} />
            </div>

            <div className="my-6 relative w-32 h-32 flex items-center justify-center">
              {/* Badge images live inside a WebGL Html-transform node, where the
                  Next Image Optimization endpoint isn't reachable. Using a plain
                  <img> with explicit dimensions to avoid CLS. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={`${issuer} ${title}`}
                width={128}
                height={128}
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <h3 className="text-xl font-semibold leading-tight text-white/90 tracking-tight">{title}</h3>
              <span className="text-[9px] text-white/40 font-mono tracking-wider uppercase mt-2">
                {locale === "de" ? "VERIFIZIERTER AUSWEIS" : "VERIFIED CREDENTIAL"}
              </span>
            </div>

            <div className="text-[10px] text-white/30 font-mono border-t border-white/10 pt-6 w-full flex justify-between tracking-wider">
              <span>ID: FA-{title.split(" ").map((w) => w[0]).join("")}-2026</span>
              <span className="text-white/60">{locale === "de" ? "AKTIV" : "ACTIVE"}</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
