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
  Color,
  PointLight,
  Mesh,
} from "three";
import * as THREE from "three";

type LightConeProps = {
  position: [number, number, number];
  intensity: number;
  angle: number;
};

function DefaultCharacter({
  characterRef,
}: {
  characterRef: RefObject<Group | null>;
}) {
  const direction = useRef(0);
  const velocity = useRef(0);
  const isJumping = useRef(false);
  const time = useRef(0);

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
    characterRef.current.rotation.y = Math.PI;

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
    const armSwing = isJumping.current ? Math.PI / 2 : swing;
    const legSwing = isJumping.current ? Math.PI / 6 : swing;

    if (leftArm.current) leftArm.current.rotation.x = -armSwing;
    if (rightArm.current) rightArm.current.rotation.x = armSwing;
    if (leftLeg.current) leftLeg.current.rotation.x = legSwing;
    if (rightLeg.current) rightLeg.current.rotation.x = -legSwing;
  });

  return (
    <group ref={characterRef} position={[0, 0.5, 5]} castShadow>
      {/* 얼굴을 전방으로 돌리기 */}
      <group rotation={[0, Math.PI, 0]}>
        {/* Head */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.4]} />
          <meshStandardMaterial color="#f0d9b5" />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.1, 1.3, -0.21]}>
          <boxGeometry args={[0.05, 0.05, 0.01]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.1, 1.3, -0.21]}>
          <boxGeometry args={[0.05, 0.05, 0.01]} />
          <meshStandardMaterial color="black" />
        </mesh>
        {/* Mouth */}
        <mesh position={[0, 1.15, -0.21]}>
          <boxGeometry args={[0.12, 0.04, 0.01]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.3]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      {/* Arms (어깨 라인 맞춰 Y를 0.9로 수정) */}
      <mesh ref={leftArm} position={[-0.42, 0.65, 0]} castShadow>
        <boxGeometry args={[0.24, 0.5, 0.2]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh ref={rightArm} position={[0.42, 0.65, 0]} castShadow>
        <boxGeometry args={[0.24, 0.5, 0.2]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      {/* Legs (몸체와 간섭 없도록 Z를 -0.12로 수정) */}
      <mesh ref={leftLeg} position={[-0.15, 0.05, -0.12]} castShadow>
        <boxGeometry args={[0.2, 0.5, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh ref={rightLeg} position={[0.15, 0.05, -0.12]} castShadow>
        <boxGeometry args={[0.2, 0.5, 0.15]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

function LightConeCircle({
  position,
  intensity,
}: {
  position: [number, number, number];
  intensity: number;
}) {
  const coneRef = useRef<Mesh>(null);

  useFrame(() => {
    if (coneRef.current) {
      const mat = coneRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.min(intensity / 4, 0.4); // 최대 0.4까지
    }
  });

  return (
    <mesh
      ref={coneRef}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]} // 평면을 바닥에 눕힘
      receiveShadow
    >
      <circleGeometry args={[3, 32]} />
      <meshStandardMaterial
        color={"#fffed9"}
        transparent
        opacity={0.2}
        emissive={"#fffed9"}
        emissiveIntensity={1}
        depthWrite={false}
      />
    </mesh>
  );
}

function LightCone({ position, intensity, angle = 0.6 }: LightConeProps) {
  const coneRef = useRef<THREE.Mesh>(null);

  const height = 6;
  const radius = Math.tan(angle) * height;

  useFrame(() => {
    if (coneRef.current) {
      const mat = coneRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.min(intensity / 4, 0.8);
    }
  });

  return (
    <mesh ref={coneRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <coneGeometry args={[radius, height, 32, 1, true]} />
      <meshStandardMaterial
        color="#ffffbb"
        transparent
        opacity={0.2}
        emissive={"#ffffcc"}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function LightPole({
  x,
  z,
  characterRef,
}: {
  x: number;
  z: number;
  characterRef: RefObject<Group | null>;
}) {
  const poleHeight = 4;
  const lightRef = useRef<SpotLight>(null!);
  const emissiveRef = useRef<Mesh>(null);
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
      ambientLightRef.current.intensity = intensity * 0.6;

    if (emissiveRef.current) {
      const mat = emissiveRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = intensity;
      mat.color = new Color(
        `hsl(50, 100%, ${Math.min(intensity * 20 + 10, 90)}%)`
      );
    }
  });

  const lightX = x + (x < 0 ? 0.5 : -0.5);
  const lightZ = z - 0.5;

  return (
    <group>
      {/* 가로등 기둥 */}
      <mesh position={[x, poleHeight / 2, z]}>
        <boxGeometry args={[0.1, poleHeight, 0.1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* 수평 막대 */}
      <mesh position={[x, poleHeight, z - 0.5]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>

      {/* 전등 구슬 */}
      <mesh ref={emissiveRef} position={[lightX, poleHeight, lightZ]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#ffffaa")}
          emissiveIntensity={1}
        />
      </mesh>

      {/* 가로등 아래 바닥 빛 퍼짐 효과 */}
      <LightConeCircle
        position={[x, 0.02, z]} // 바닥 바로 위에 살짝 띄움
        intensity={coneIntensity}
      />

      {/* SpotLight: 그림자 포함 진짜 조명 */}
      <spotLight
        ref={lightRef}
        position={[lightX, poleHeight, lightZ]}
        angle={0.5}
        penumbra={0.8}
        distance={15}
        intensity={coneIntensity}
        castShadow
        color="#fffed9"
        target-position={[x, 0, z]}
      />

      {/* 주변 부드러운 광 */}
      <pointLight
        ref={ambientLightRef}
        position={[x, 2, z]}
        color="#ffffcc"
        intensity={0}
        distance={8}
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
      <meshStandardMaterial
        map={map || undefined}
        color={map ? undefined : "#222"} // map 없을 경우 기본 회색
        roughness={0.6} // 도로가 너무 반짝이지 않게
        metalness={0.1} // 약간의 반사감
      />
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
            <LightPole x={-4.8} z={z} characterRef={characterRef} />
            <LightPole x={4.8} z={z} characterRef={characterRef} />
          </React.Fragment>
        );
      })}

      <DefaultCharacter characterRef={characterRef} />
      <Road />
      <Railing />
    </Canvas>
  );
}
