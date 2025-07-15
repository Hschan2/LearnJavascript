import React, { useEffect, useRef, useState, RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import {
  Group,
  SpotLight,
  TextureLoader,
  RepeatWrapping,
  Texture,
  Vector3,
  Euler,
  Color,
  PointLight,
  Mesh,
  MeshBasicMaterial,
  ConeGeometry,
} from "three";
import * as THREE from "three";

function DefaultCharacter({
  characterRef,
}: {
  characterRef: RefObject<Group | null>;
}) {
  const direction = useRef(0);
  const velocity = useRef(0);
  const isJumping = useRef(false);
  const time = useRef(0);

  const jumpArmRotation = useRef(0);
  const jumpLegRotation = useRef(0);

  const leftArm = useRef<Mesh>(null);
  const rightArm = useRef<Mesh>(null);
  const leftLeg = useRef<Mesh>(null);
  const rightLeg = useRef<Mesh>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") direction.current = 1;
      else if (e.key === "ArrowDown" || e.key === "s") direction.current = -1;
      if (e.key === " " && characterRef.current && !isJumping.current) {
        velocity.current = 0.12;
        isJumping.current = true;
      }
    };
    const handleKeyUp = () => (direction.current = 0);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!characterRef.current) return;
    const movement = direction.current * delta * 6;
    characterRef.current.position.z -= movement;

    if (isJumping.current) {
      characterRef.current.position.y += velocity.current;
      velocity.current -= 0.01;
      if (characterRef.current.position.y <= 0.5) {
        characterRef.current.position.y = 0.5;
        velocity.current = 0;
        isJumping.current = false;
      }
    }

    time.current += delta;
    const swing = Math.sin(time.current * 10) * 0.6;

    // 부드러운 회전 보간 처리 (GSAP 없이 수동 보간)
    const targetArmRotation = isJumping.current ? -Math.PI / 2 : 0;
    const targetLegRotation = isJumping.current ? Math.PI / 6 : 0;
    jumpArmRotation.current +=
      (targetArmRotation - jumpArmRotation.current) * 0.2;
    jumpLegRotation.current +=
      (targetLegRotation - jumpLegRotation.current) * 0.2;

    if (leftArm.current)
      leftArm.current.rotation.x = isJumping.current
        ? jumpArmRotation.current
        : -swing;
    if (rightArm.current)
      rightArm.current.rotation.x = isJumping.current
        ? jumpArmRotation.current
        : swing;

    if (leftLeg.current)
      leftLeg.current.rotation.x = isJumping.current
        ? jumpLegRotation.current
        : swing;
    if (rightLeg.current)
      rightLeg.current.rotation.x = isJumping.current
        ? -jumpLegRotation.current
        : -swing;
  });

  return (
    <group ref={characterRef} position={[0, 0.5, 5]} castShadow>
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#f0d9b5" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.1, 1.3, 0.21]}>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.1, 1.3, 0.21]}>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, 1.15, 0.21]}>
        <boxGeometry args={[0.12, 0.04, 0.01]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.3]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      {/* Arms */}
      <mesh ref={leftArm} position={[-0.45, 0.75, 0]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh ref={rightArm} position={[0.45, 0.75, 0]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      {/* Legs */}
      <mesh ref={leftLeg} position={[-0.15, 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh ref={rightLeg} position={[0.15, 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

function Character({
  characterRef,
}: {
  characterRef: RefObject<Group | null>;
}) {
  const direction = useRef(0);
  const [limbRotation, setLimbRotation] = useState(0);
  const velocity = useRef(0);
  const isJumping = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") direction.current = 1;
      else if (e.key === "ArrowDown" || e.key === "s") direction.current = -1;
      if (e.key === " " && characterRef.current && !isJumping.current) {
        velocity.current = 0.12;
        isJumping.current = true;
      }
    };
    const handleKeyUp = () => (direction.current = 0);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!characterRef.current) return;

    const movement = direction.current * delta * 6;
    characterRef.current.position.z -= movement;

    if (direction.current !== 0) {
      setLimbRotation((prev) => prev + delta * 12);
    }

    if (isJumping.current) {
      characterRef.current.position.y += velocity.current;
      velocity.current -= 0.01;
      if (characterRef.current.position.y <= 0.5) {
        characterRef.current.position.y = 0.5;
        velocity.current = 0;
        isJumping.current = false;
      }
    }
  });

  const limbAngle = Math.sin(limbRotation) * 0.6;

  return (
    <group ref={characterRef} position={[0, 0.5, 5]} castShadow>
      {/* 머리 */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#f0d9b5" />
      </mesh>
      {/* 몸통 */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.3]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      {/* 팔 (몸통에 더 붙게 수정) */}
      <mesh position={[-0.35, 0.75, 0]} rotation={[limbAngle, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[0.35, 0.75, 0]} rotation={[-limbAngle, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      {/* 다리 */}
      <mesh position={[-0.15, 0.1, 0]} rotation={[limbAngle, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0.15, 0.1, 0]} rotation={[-limbAngle, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

function LightCone({
  position,
  intensity,
}: {
  position: [number, number, number];
  intensity: number;
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <coneGeometry args={[2, 5, 32, 1, true]} />
      <meshBasicMaterial
        color="#ffffcc"
        opacity={intensity * 0.15}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function LightPole({
  x,
  z,
  targetZ,
  characterRef,
}: {
  x: number;
  z: number;
  targetZ: number;
  characterRef: RefObject<Group | null>;
}) {
  const poleHeight = 4;
  const lightRef = useRef<SpotLight>(null!);
  const emissiveRef = useRef<Mesh>(null);
  const coneRef = useRef<Mesh>(null);
  const ambientLightRef = useRef<PointLight>(null);
  const [coneIntensity, setConeIntensity] = useState(0);

  useFrame(() => {
    if (!characterRef.current) return;
    const charZ = characterRef.current.position.z;
    const distance = Math.abs(charZ - z);
    const falloffStart = 10;
    const falloffEnd = 30;
    let intensity = 0;
    if (distance < falloffStart) intensity = 4;
    else if (distance < falloffEnd)
      intensity =
        4 * (1 - (distance - falloffStart) / (falloffEnd - falloffStart));
    setConeIntensity(intensity);
    if (lightRef.current) lightRef.current.intensity = intensity;
    if (ambientLightRef.current)
      ambientLightRef.current.intensity = intensity * 0.8;
    if (emissiveRef.current) {
      const mat = emissiveRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = intensity;
      mat.color = new Color(
        `hsl(50, 100%, ${Math.min(intensity * 20 + 10, 90)}%)`
      );
    }
  });

  return (
    <group>
      <mesh position={[x, poleHeight / 2, z]}>
        <boxGeometry args={[0.1, poleHeight, 0.1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[x, poleHeight, z - 0.5]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>
      <mesh
        ref={emissiveRef}
        position={[x + (x < 0 ? 0.5 : -0.5), poleHeight, z - 0.5]}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#ffffaa")}
          emissiveIntensity={1}
        />
      </mesh>
      <LightCone
        position={[x + (x < 0 ? 0.5 : -0.5), poleHeight - 0.5, z - 0.5]}
        intensity={coneIntensity}
      />
      <spotLight
        ref={lightRef}
        position={[x + (x < 0 ? 0.5 : -0.5), poleHeight, z - 0.5]}
        angle={0.4}
        penumbra={0.5}
        distance={15}
        intensity={0}
        castShadow
        color="#fffed9"
      />
      <pointLight
        ref={ambientLightRef}
        position={[x, 2, z]}
        color="#ffffcc"
        intensity={0}
        distance={10}
        decay={2}
      />
    </group>
  );
}

function Road() {
  const [map, setMap] = useState<Texture | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      "/road-texture.jpg",
      (loaded) => {
        loaded.wrapS = loaded.wrapT = RepeatWrapping;
        loaded.repeat.set(1, 20);
        setMap(loaded);
      },
      undefined,
      () => {
        console.warn(
          "로드 텍스처를 찾을 수 없습니다. 기본 색상으로 대체합니다."
        );
        setMap(null);
      }
    );
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[10, 500]} />
      {map ? (
        <meshStandardMaterial map={map} />
      ) : (
        <meshStandardMaterial color="#444" metalness={0.5} roughness={0.3} />
      )}
    </mesh>
  );
}

function Railing() {
  return (
    <>
      {[-5, 5].map((x, i) => (
        <mesh key={`rail-${x}`} position={[x, 0.3, -250]} receiveShadow>
          <boxGeometry args={[0.1, 0.6, 500]} />
          <meshStandardMaterial
            color="#999"
            metalness={1}
            roughness={0.05}
            emissive="#333"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </>
  );
}

function CameraFollow({
  characterRef,
}: {
  characterRef: RefObject<Group | null>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    if (!characterRef.current) return;
    const charPos = characterRef.current.position;
    camera.position.z = charPos.z + 10;
    camera.position.y = 3;
    camera.lookAt(new Vector3(0, 0.5, charPos.z));
  });
  return null;
}

export default function RunningRoadScene() {
  const characterRef = useRef<Group | null>(null);

  return (
    <Canvas
      shadows
      camera={{ fov: 60, position: [0, 3, 10] }}
      style={{ width: "100vw", height: "100vh", background: "#0a0a33" }}
    >
      <PerspectiveCamera makeDefault position={[0, 3, 10]} />
      <ambientLight intensity={0.3} />
      <CameraFollow characterRef={characterRef} />

      {[...Array(5)].map((_, i) => {
        const z = -i * 20;
        return (
          <React.Fragment key={i}>
            <LightPole x={-4.8} z={z} targetZ={z} characterRef={characterRef} />
            <LightPole x={4.8} z={z} targetZ={z} characterRef={characterRef} />
          </React.Fragment>
        );
      })}

      <DefaultCharacter characterRef={characterRef} />
      <Road />
      <Railing />
    </Canvas>
  );
}
