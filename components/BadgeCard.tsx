"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface BadgeCardProps {
  position: [number, number, number];
  title: string;
  issuer: string;
  imageSrc: string;
  accentColor: string;
  scrollProgress: number;
}

export default function BadgeCard({ position, title, issuer, imageSrc, accentColor, scrollProgress }: BadgeCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Calculate visibility based on scrollProgress
  // Fade in when scrollProgress > 0.8
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.8) * 6));
  const isVisible = opacity > 0;

  useFrame((state) => {
    if (!groupRef.current || !isVisible) return;

    if (hovered) {
      // Gentle 3D Tilt based on mouse pointer coordinates
      const targetY = state.pointer.x * 0.3;
      const targetX = -state.pointer.y * 0.3;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
      
      // Slight scale and translate forward on hover
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.05, 0.1));
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2] + 0.5, 0.1);
    } else {
      // Idle float animation
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
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
          className="w-[340px] h-[460px] rounded-[32px] bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/[0.08] p-8 flex flex-col justify-between items-center text-center transition-all duration-500 relative overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] cursor-pointer group"
          style={{
            borderColor: hovered ? accentColor : 'rgba(255, 255, 255, 0.08)',
            opacity: opacity,
            display: isVisible ? 'flex' : 'none',
            pointerEvents: isVisible ? 'auto' : 'none',
            transform: hovered ? 'translateY(-8px)' : 'translateY(0)'
          }}
        >
          {/* Spotlight background */}
          <div 
            className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
            }}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageSrc} 
              alt={`${issuer} ${title}`} 
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <h3 className="text-xl font-semibold leading-tight text-white/90 tracking-tight">{title}</h3>
            <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase mt-2">VERIFIED CREDENTIAL</span>
          </div>

            <div className="text-[10px] text-white/30 font-mono border-t border-white/10 pt-6 w-full flex justify-between tracking-widest">
              <span>ID: FA-{title.split(' ').map(w => w[0]).join('')}-2026</span>
              <span className="text-white/60">AKTIV</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
