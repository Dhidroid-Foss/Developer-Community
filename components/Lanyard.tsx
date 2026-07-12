"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, type ThreeElement, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  name: string;
  role: string;
  avatar: string;
}

export default function Lanyard({
  position = [0, 0, 15],
  gravity = [0, -35, 0],
  fov = 24,
  transparent = true,
  name,
  role,
  avatar
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] flex justify-center items-center select-none">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        }}
      >
        <ambientLight intensity={Math.PI * 0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            name={name}
            role={role}
            avatar={avatar}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  name: string;
  role: string;
  avatar: string;
}

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  name,
  role,
  avatar
}: BandProps) {
  const band = useRef<THREE.Mesh<InstanceType<typeof MeshLineGeometry>, InstanceType<typeof MeshLineMaterial>>>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<LanyardRigidBody>(null!);
  const j2 = useRef<LanyardRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const getLerped = (body: LanyardRigidBody): THREE.Vector3 => {
    if (!body.lerped) {
      body.lerped = new THREE.Vector3().copy(body.translation());
    }
    return body.lerped;
  };

  // 1. Procedural Lanyard Ribbon Texture
  const ribbonTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Ribbon Orange Background
      ctx.fillStyle = "#fa6739";
      ctx.fillRect(0, 0, 512, 64);
      
      // Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px Courier, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Print repeated text
      ctx.fillText("✦ DEVSYNC STREAM ✦ BUILD TOGETHER ✦", 256, 32);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // 2. Procedural Card Front Texture
  const [frontTex, setFrontTex] = useState<THREE.CanvasTexture | null>(null);
  
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderCard = (avatarImg: HTMLImageElement | null) => {
      // Background
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, 512, 768);

      // Gradient Edge border
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#fa6739";
      ctx.strokeRect(7, 7, 498, 754);

      // Header Tag
      ctx.fillStyle = "#fa6739";
      ctx.fillRect(14, 14, 484, 90);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px Courier, monospace";
      ctx.textAlign = "center";
      ctx.fillText("DEVSYNC MEMBER", 256, 68);

      // Photo Frame
      ctx.fillStyle = "#222222";
      ctx.fillRect(106, 150, 300, 300);
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 4;
      ctx.strokeRect(106, 150, 300, 300);

      if (avatarImg) {
        ctx.drawImage(avatarImg, 110, 154, 292, 292);
      } else {
        // Fallback profile symbol
        ctx.fillStyle = "#fa6739";
        ctx.font = "80px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("✦", 256, 310);
      }

      // Name
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(name.toUpperCase(), 256, 510);

      // Role
      ctx.fillStyle = "#a8a29e";
      ctx.font = "20px monospace";
      ctx.fillText(role, 256, 550);

      // Member ID
      ctx.fillStyle = "#fa6739";
      ctx.font = "16px monospace";
      const idStr = `ID: DS-${name.replace(/\s+/g, "").substring(0, 4).toUpperCase()}-2026`;
      ctx.fillText(idStr, 256, 595);

      // Barcode lines
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(80, 650, 352, 60);

      // Draw mock barcode stripes
      ctx.fillStyle = "#000000";
      let x = 95;
      while (x < 415) {
        const w = Math.random() > 0.5 ? 4 : 8;
        ctx.fillRect(x, 655, w, 50);
        x += w + (Math.random() > 0.5 ? 4 : 8);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setFrontTex(tex);
    };

    // First render with fallback
    renderCard(null);

    // Load avatar image with CORS support
    if (avatar) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        renderCard(img);
      };
      img.src = avatar;
    }
  }, [name, role, avatar]);

  // 3. Procedural Card Back Texture
  const backTex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Dark Backside
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, 512, 768);

      // Border
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#cfcac0";
      ctx.strokeRect(7, 7, 498, 754);

      // DevSync Star Logo
      ctx.fillStyle = "#fa6739";
      ctx.font = "120px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✦", 256, 320);

      // Text Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px monospace";
      ctx.fillText("DEVSYNC", 256, 450);

      ctx.fillStyle = "#a8a29e";
      ctx.font = "18px monospace";
      ctx.fillText("REALTIME DEVELOPER COMMUNITY", 256, 490);

      // Bottom disclaimer
      ctx.font = "14px monospace";
      ctx.fillText("devsync.community", 256, 680);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.2]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        const lerped = getLerped(ref.current);
        const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation())));
        lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(getLerped(j2.current));
      curve.points[2].copy(getLerped(j1.current));
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = "chordal";
  ribbonTexture.wrapS = ribbonTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        {/* Dynamic Physical Card Badge */}
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.02]} />
          
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* Lanyard Top Metal Ring/Clip */}
            <mesh position={[0, 1.3, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
              <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.9} />
            </mesh>

            {/* Layered Physical Card Body */}
            {/* Card Orange Core border */}
            <mesh castShadow>
              <boxGeometry args={[1.6, 2.25, 0.03]} />
              <meshPhysicalMaterial color="#fa6739" roughness={0.3} metalness={0.7} clearcoat={1} />
            </mesh>

            {/* Front Face Plane */}
            {frontTex && (
              <mesh position={[0, 0, 0.016]}>
                <planeGeometry args={[1.54, 2.19]} />
                <meshPhysicalMaterial 
                  map={frontTex} 
                  clearcoat={1} 
                  clearcoatRoughness={0.15} 
                  roughness={0.5} 
                />
              </mesh>
            )}

            {/* Back Face Plane */}
            <mesh position={[0, 0, -0.016]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.54, 2.19]} />
              <meshPhysicalMaterial 
                map={backTex} 
                clearcoat={1} 
                clearcoatRoughness={0.15} 
                roughness={0.5} 
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Lanyard Rope Band */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          map={ribbonTexture}
          repeat={[-3, 1]}
          lineWidth={0.9}
        />
      </mesh>
    </>
  );
}
