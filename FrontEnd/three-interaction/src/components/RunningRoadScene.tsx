import React, { useEffect, useRef, useState, RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import {
  Group,
  SpotLight,
  TextureLoader,
  RepeatWrapping,
  Texture,
  Vector3,
} from "three";
import * as THREE from "three";

function Character({
  characterRef,
}: {
  characterRef: RefObject<Group | null>;
}) {
  const direction = useRef(0);
  const [legRotation, setLegRotation] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") direction.current = 1;
      else if (e.key === "ArrowDown" || e.key === "s") direction.current = -1;
      if (e.key === " " && characterRef.current) {
        characterRef.current.position.y += 1;
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

    const movement = direction.current * delta * 4;
    characterRef.current!.position.z -= movement;
    if (direction.current !== 0) {
      setLegRotation((prev) => prev + delta * 10);
    }
  });

  const legAngle = Math.sin(legRotation) * 0.5;

  return (
    <group ref={characterRef} position={[0, 0.5, 5]} castShadow>
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#f0d9b5" />
      </mesh>
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.3]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[-0.15, -0.8, 0]} rotation={[legAngle, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0.15, -0.8, 0]} rotation={[-legAngle, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
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
  const emissiveRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!characterRef.current) return;

    const charZ = characterRef.current!.position.z;
    const distance = Math.abs(charZ - z);
    const falloffStart = 10;
    const falloffEnd = 40;

    let intensity = 0;
    if (distance < falloffStart) intensity = 2;
    else if (distance < falloffEnd)
      intensity =
        2 * (1 - (distance - falloffStart) / (falloffEnd - falloffStart));

    if (lightRef.current) lightRef.current.intensity = intensity;

    if (emissiveRef.current) {
      (
        emissiveRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = intensity;
    }
  });

  return (
    <group>
      <mesh position={[x, poleHeight / 2, z]}>
        <boxGeometry args={[0.1, poleHeight, 0.1]} />
        <meshStandardMaterial color="#00ffff" />
      </mesh>
      <mesh ref={emissiveRef} position={[x, poleHeight, z - 0.3]}>
        <boxGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#ffffff")}
          emissiveIntensity={1}
        />
      </mesh>
      <spotLight
        ref={lightRef}
        position={[x, poleHeight, z - 0.8]}
        angle={0.5}
        penumbra={0.5}
        distance={10}
        intensity={0}
        castShadow={true}
        target-position={[0, 0, targetZ]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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
      {[-5, 5].map((x) => (
        <mesh key={x} position={[x, 0.3, -250]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.1, 0.6, 500]} />
          <meshStandardMaterial color="#888" metalness={0.6} roughness={0.2} />
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

    const charPos = characterRef.current!.position;
    camera.position.z = charPos.z + 10;
    camera.position.y = 3;
    camera.lookAt(new Vector3(0, 0.5, charPos.z));
  });
  return null;
}

export default function RunningRoadScene() {
  const characterRef = useRef<Group>(null);

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

      <Character characterRef={characterRef} />
      <Road />
      <Railing />
    </Canvas>
  );
}
