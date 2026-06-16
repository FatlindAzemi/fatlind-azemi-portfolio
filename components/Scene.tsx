"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { type MotionValue, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import BadgeCard from "./BadgeCard";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

// Helper to generate binary textures (0 and 1) for particles
function useBinaryTextures() {
  return useMemo(() => {
    if (typeof document === "undefined") return [null, null];
    const createCharTexture = (char: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 64, 64);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 52px monospace";
        ctx.fillText(char, 32, 34);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      return tex;
    };
    return [createCharTexture("0"), createCharTexture("1")];
  }, []);
}

// Helper to generate text textures for code snippets
function useSnippetTextures(snippets: string[]) {
  return useMemo(() => {
    if (typeof document === "undefined") return snippets.map(() => null);
    return snippets.map((text) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 1024, 128);
        ctx.fillStyle = "rgba(0, 162, 255, 0.6)"; // Muted blue
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 42px monospace";
        // Very subtle glow
        ctx.shadowColor = "#00a2ff";
        ctx.shadowBlur = 4;
        ctx.fillText(text, 512, 64);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      return tex;
    });
  }, [snippets]);
}

// ---------------------------------------------------------
// Particle Tunnel: ambient background data stream
// ---------------------------------------------------------
function ParticleTunnel({ scrollProgress, reducedMotion }: { scrollProgress: MotionValue<number>; reducedMotion: boolean }) {
  const points0Ref = useRef<THREE.Points>(null);
  const points1Ref = useRef<THREE.Points>(null);
  const material0Ref = useRef<THREE.PointsMaterial>(null);
  const material1Ref = useRef<THREE.PointsMaterial>(null);

  const particleCount = 1800;
  const halfCount = Math.floor(particleCount / 2);

  const [tex0, tex1] = useBinaryTextures();

  const { pos0, pos1 } = useMemo(() => {
    const p0 = new Float32Array(halfCount * 3);
    const p1 = new Float32Array((particleCount - halfCount) * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.pow(Math.random(), 1.6) * 6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * 80 - 60;
      
      if (i < halfCount) {
        p0[i * 3] = x;
        p0[i * 3 + 1] = y;
        p0[i * 3 + 2] = z;
      } else {
        const j = i - halfCount;
        p1[j * 3] = x;
        p1[j * 3 + 1] = y;
        p1[j * 3 + 2] = z;
      }
    }
    return { pos0: p0, pos1: p1 };
  }, [particleCount, halfCount]);

  const colors = useMemo(
    () => [
      new THREE.Color("#e2e8f0"),
      new THREE.Color("#00a2ff"),
      new THREE.Color("#ff3600"),
      new THREE.Color("#fbbf24"),
      new THREE.Color("#10b981"),
      new THREE.Color("#a78bfa"),
    ],
    []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (points0Ref.current && points1Ref.current) {
      points0Ref.current.rotation.z = time * 0.02;
      points0Ref.current.rotation.y = Math.sin(time * 0.08) * 0.04;
      points1Ref.current.rotation.z = time * 0.02;
      points1Ref.current.rotation.y = Math.sin(time * 0.08) * 0.04;
    }
    if (material0Ref.current && material1Ref.current) {
      const progress = scrollProgress.get() * 5;
      const index = Math.min(Math.floor(progress), 4);
      const segmentProgress = progress - index;
      const c1 = colors[index];
      const c2 = colors[index + 1];
      material0Ref.current.color.lerpColors(c1, c2, segmentProgress);
      material1Ref.current.color.lerpColors(c1, c2, segmentProgress);
    }
  });

  return (
    <>
      <points ref={points0Ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos0, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={material0Ref}
          size={0.25}
          map={tex0 || undefined}
          sizeAttenuation
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={points1Ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos1, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={material1Ref}
          size={0.25}
          map={tex1 || undefined}
          sizeAttenuation
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// ---------------------------------------------------------
// NeuralCore: Hero section central network sphere
// ---------------------------------------------------------
function NeuralCore({ scrollProgress, reducedMotion }: { scrollProgress: MotionValue<number>; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const nodes = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.8;
      arr.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }
    return arr;
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].distanceTo(nodes[j]);
        if (d < 1.4) {
          positions.push(...nodes[i].toArray(), ...nodes[j].toArray());
        }
      }
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.1;
      const visibility = 1 - Math.min(1, Math.max(0, scrollProgress.get() * 3));
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, visibility, 0.05));
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -time * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#00d2ff"
          emissive="#0078ff"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00a2ff" transparent opacity={0.25} />
      </lineSegments>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00a2ff"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00a2ff" distance={10} />
    </group>
  );
}

// ---------------------------------------------------------
// DataPipeline: flowing particles through tubular rings
// ---------------------------------------------------------
function DataPipeline({ scrollProgress, reducedMotion }: { scrollProgress: MotionValue<number>; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 1, 0),
      new THREE.Vector3(-1, -0.5, 1),
      new THREE.Vector3(1, 0.5, -1),
      new THREE.Vector3(3, -1, 0),
    ]);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.08, 8, false), [curve]);

  const particlePositions = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const p = curve.getPoint(t);
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    }
    return pos;
  }, [curve]);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      const visibility = Math.max(0, 1 - Math.abs(scrollProgress.get() - 0.35) * 4);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, visibility, 0.05));
      groupRef.current.rotation.z = time * 0.05;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.z = -time * 0.3;
    }
  });

  const [tex0, tex1] = useBinaryTextures();

  return (
    <group ref={groupRef} position={[2.5, 0.5, -12]}>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#00a2ff"
          emissive="#0078ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.35}
          map={tex1 || undefined}
          color="#00d2ff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <pointLight position={[0, 0, 0]} intensity={2} color="#00a2ff" distance={12} />
    </group>
  );
}

// ---------------------------------------------------------
// TechOrbit: rotating rings for skills section
// ---------------------------------------------------------
function TechOrbit({ scrollProgress, reducedMotion }: { scrollProgress: MotionValue<number>; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      const visibility = Math.max(0, 1 - Math.abs(scrollProgress.get() - 0.55) * 5);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, visibility * 0.75, 0.05));
      groupRef.current.rotation.y = time * 0.05;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.x = time * 0.12;
    if (ring2Ref.current) ring2Ref.current.rotation.y = time * 0.15;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.1;
  });

  return (
    <group ref={groupRef} position={[-2.8, -0.5, -24]}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.025, 16, 100]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.2} transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.025, 16, 100]} />
        <meshStandardMaterial color="#00a2ff" emissive="#0078ff" emissiveIntensity={0.2} transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.0, 0.025, 16, 100]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.2} transparent opacity={0.35} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.8 + (i % 2) * 0.4;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={i % 2 === 0 ? "#00a2ff" : "#a78bfa"}
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#a78bfa" distance={12} />
    </group>
  );
}

// ---------------------------------------------------------
// ParticleWave: soft wave for contact section
// Only the contact section (~scrollProgress 0.9) shows this, so we early-return
// the per-vertex update whenever it is far off-camera. This is the single most
// expensive per-frame routine in the scene (800 verts/frame + buffer reupload),
// so gating it is the highest-ROI perf win.
// ---------------------------------------------------------
function ParticleWave({ scrollProgress, reducedMotion }: { scrollProgress: MotionValue<number>; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (i % 40) - 20;
      const z = Math.floor(i / 40) - 10;
      pos[i * 3] = x * 0.4;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = z * 0.4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Wave lives at z=-36 and is only visible near the contact section.
    if (reducedMotion || scrollProgress.get() < 0.7) {
      pointsRef.current.rotation.y = 0;
      return;
    }
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.02;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length / 3; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      positions[i * 3 + 1] = Math.sin(x * 0.5 + time) * 0.3 + Math.cos(z * 0.5 + time * 0.7) * 0.2;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const [tex0] = useBinaryTextures();

  return (
    <points ref={pointsRef} position={[0, -2, -36]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        map={tex0 || undefined}
        color="#00d2ff"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ---------------------------------------------------------
// CodeSnippets: Floating holographic Python/SQL code
// ---------------------------------------------------------
function CodeSnippets({ scrollProgress, reducedMotion }: { scrollProgress: MotionValue<number>; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const snippets = useMemo(() => [
    "SELECT * FROM data_lake",
    "df.groupby('id').sum()",
    "INSERT INTO warehouse",
    "import pandas as pd",
    "spark.read.parquet()",
    "CREATE TABLE analytics",
    "def etl_pipeline():",
    "WITH cte AS (SELECT",
    "Airflow.DAG('daily')",
    "kafka.produce(topic)"
  ], []);

  const textures = useSnippetTextures(snippets);

  const items = useMemo(() => {
    return snippets.map((_, i) => {
      // Spread them across a large Z range to fly through
      const z = Math.random() * -60; 
      // Place them further off center to be less prominent
      const x = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4);
      const y = (Math.random() - 0.5) * 8;
      return { 
        position: [x, y, z] as [number, number, number],
        textureIndex: i
      };
    });
  }, [snippets]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, idx) => {
        if (child.userData.initY === undefined) {
          child.userData.initY = child.position.y;
        }
        // Very slow floating animation
        child.position.y = child.userData.initY + Math.sin(time * 0.3 + idx) * 0.2;
        
        // Slowly fly towards the camera
        child.position.z += delta * 1.5;
        
        // If they pass the camera, reset them far back
        if (child.position.z > 10) {
          child.position.z = -60;
          child.position.x = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4);
          child.userData.initY = (Math.random() - 0.5) * 8;
        }
        
        // Extremely subtle rotation
        child.rotation.y = Math.sin(time * 0.2 + idx) * 0.05;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh key={i} position={item.position} userData={{}}>
          {/* Aspect ratio 1024:128 is 8:1 - made much smaller */}
          <planeGeometry args={[2.5, 0.3125]} />
          <meshBasicMaterial 
            map={textures[item.textureIndex] || undefined} 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------
// Main Scene
// ---------------------------------------------------------
export default function Scene({ scrollProgress }: SceneProps) {
  // useReducedMotion returns boolean | null (null before first measurement);
  // coalesce to boolean for downstream prop types.
  const reducedMotion = useReducedMotion() ?? false;
  const smoothProgress = useRef(0);
  const initialized = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const camPoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 8),
      new THREE.Vector3(0, 0, -2),
      new THREE.Vector3(0, 0, -12),
      new THREE.Vector3(0, 0, -24),
      new THREE.Vector3(0, 0, -36),
      new THREE.Vector3(0, 0, -46),
    ],
    []
  );

  const targetPoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -6),
      new THREE.Vector3(0, 0, -12),
      new THREE.Vector3(0, 0, -24),
      new THREE.Vector3(0, 0, -36),
      new THREE.Vector3(0, 0, -46),
    ],
    []
  );

  useFrame((state) => {
    // Reduced-motion: hold the hero frame, no camera fly-through.
    if (reducedMotion) {
      state.camera.position.set(camPoints[0].x, camPoints[0].y, camPoints[0].z);
      state.camera.lookAt(targetPoints[0]);
      return;
    }

    if (!initialized.current) {
      smoothProgress.current = scrollProgress.get();
      initialized.current = true;
    } else {
      smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, scrollProgress.get(), 0.06);
    }

    const progress = smoothProgress.current * 5;
    const index = Math.min(Math.floor(progress), 4);
    const segmentProgress = progress - index;

    const p1 = camPoints[index];
    const p2 = camPoints[Math.min(index + 1, camPoints.length - 1)];
    const currentCamPos = new THREE.Vector3().lerpVectors(p1, p2, segmentProgress);

    const t1 = targetPoints[index];
    const t2 = targetPoints[Math.min(index + 1, targetPoints.length - 1)];
    const currentTarget = new THREE.Vector3().lerpVectors(t1, t2, segmentProgress);

    state.camera.position.copy(currentCamPos);
    state.camera.lookAt(currentTarget);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />

      <ParticleTunnel scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <NeuralCore scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <DataPipeline scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <TechOrbit scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <ParticleWave scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <CodeSnippets scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      <group position={[0, 0, -46]}>
        <BadgeCard
          position={[-2.1, 0, 0]}
          issuer="Google Cloud"
          title="Professional Data Engineer"
          imageSrc="/google-badge.jpg"
          accentColor="#4285f4"
          scrollProgress={scrollProgress}
        />
        <BadgeCard
          position={[2.1, 0, 0]}
          issuer="Databricks"
          title="Certified Data Engineer Associate"
          imageSrc="/databricks-badge.jpg"
          accentColor="#ff3600"
          scrollProgress={scrollProgress}
        />
      </group>

      {!isMobile && (
        <EffectComposer multisampling={2}>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={0.9} />
        </EffectComposer>
      )}
    </>
  );
}
