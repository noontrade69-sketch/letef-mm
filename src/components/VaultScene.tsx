"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* Custom 3D escrow vault: hex shell, amber core, lock ring, seller/buyer nodes,
   and a USDT token that travels from the seller into the vault and stays locked.
   Labels (SELLER / SMART CONTRACT / BUYER) are HTML overlay elements in Hero —
   never critical content inside the canvas (Part 12). */

function Token({ curve, coreRef }: { curve: THREE.CatmullRomCurve3; coreRef: React.MutableRefObject<THREE.Mesh | null> }) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    t.current += dt;
    const T = t.current % 6;
    const g = ref.current;
    if (!g) return;
    if (T < 2.2) {
      const k = T / 2.2;
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      curve.getPointAt(Math.min(e, 1), g.position);
      g.visible = true;
      g.scale.setScalar(1);
    } else if (T < 3.4) {
      // absorbed: shrink into the core, core pulse
      g.visible = false;
      if (coreRef.current) {
        const m = coreRef.current.material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = 1.5 + Math.sin((T - 2.2) * 9) * 0.9;
      }
    } else {
      g.visible = false;
      if (coreRef.current) {
        const m = coreRef.current.material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = 1.4;
      }
    }
  });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.07, 24]} />
        <meshStandardMaterial color="#F0B90B" metalness={0.55} roughness={0.3} emissive="#F0B90B" emissiveIntensity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.045, 0]}>
        <torusGeometry args={[0.19, 0.03, 10, 32]} />
        <meshStandardMaterial color="#c99700" metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Scene({ running }: { running: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const clock = useRef(0);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3.15, 0.95, 0.6),
        new THREE.Vector3(-1.9, 1.7, 0.2),
        new THREE.Vector3(-0.7, 0.9, 0.0),
        new THREE.Vector3(0, 0, 0),
      ]),
    []
  );

  const pillars = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      arr.push({ pos: [Math.cos(a) * 1.42, 0, Math.sin(a) * 1.42], rot: -a });
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (!running) return;
    clock.current += dt;
    const t = clock.current;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.22) * 0.16;
      group.current.position.y = Math.sin(t * 0.8) * 0.05;
    }
    if (ring.current) ring.current.rotation.z = t * 0.25;
  });

  return (
    <group ref={group}>
      {/* open hex cage: top + bottom plates, six pillars — core visible inside */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.1, 6]} />
        <meshStandardMaterial color="#F0B90B" metalness={0.62} roughness={0.3} flatShading />
      </mesh>
      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.1, 6]} />
        <meshStandardMaterial color="#c99700" metalness={0.62} roughness={0.3} flatShading />
      </mesh>
      {pillars.map((pl, i) => (
        <mesh key={i} position={pl.pos} rotation={[0, pl.rot, 0]}>
          <boxGeometry args={[0.1, 1.96, 0.16]} />
          <meshStandardMaterial color="#2b2415" metalness={0.85} roughness={0.32} />
        </mesh>
      ))}
      {/* lock ring + glowing core, visible through the cage */}
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.88, 0.05, 12, 64]} />
        <meshStandardMaterial color="#1d6650" metalness={0.7} roughness={0.35} emissive="#16513F" emissiveIntensity={0.35} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#F0B90B" emissive="#F0B90B" emissiveIntensity={1.6} metalness={0.2} roughness={0.3} />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#F0B90B" intensity={11} distance={6.5} />
      {/* seller / buyer nodes */}
      <mesh position={[-3.15, 0.95, 0.6]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#cfc7b4" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[3.15, -0.75, 0.6]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#1d6650" metalness={0.6} roughness={0.35} emissive="#16513F" emissiveIntensity={0.3} />
      </mesh>
      <Token curve={curve} coreRef={core} />
    </group>
  );
}

export default function VaultScene({ running }: { running: boolean }) {
  const small = typeof window !== "undefined" && window.innerWidth < 1081;
  return (
    <Canvas
      camera={{ position: [0, 0.4, 7.4], fov: 38 }}
      dpr={small ? [1, 1.3] : [1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.25} />
      <pointLight position={[-4, -2, 3]} color="#16513F" intensity={4} distance={9} />
      <Scene running={running} />
    </Canvas>
  );
}
