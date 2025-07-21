import React, { useEffect, useRef, useState, RefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html, PerspectiveCamera } from "@react-three/drei";
import {
  Group,
  SpotLight,
  TextureLoader,
  RepeatWrapping,
  Texture,
  Vector3,
  Color,
  Mesh,
  LinearFilter,
  MeshStandardMaterial,
} from "three";

function DefaultCharacter({
  characterRef,
}: {
  characterRef: RefObject<Group | null>;
}) {
  const direction = useRef(0);
  const velocity = useRef(0);
  const isJumping = useRef(false);
  const isMoving = useRef(false);
  const time = useRef(0);
  const prevZ = useRef(0);

  const leftArm = useRef<Mesh>(null);
  const rightArm = useRef<Mesh>(null);
  const leftLeg = useRef<Mesh>(null);
  const rightLeg = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);

  const [headTexture, setHeadTexture] = useState<Texture | null>(null);

  // ✅ 키보드 입력 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") direction.current = 1;
      else if (e.key === "ArrowDown" || e.key === "s") direction.current = -1;

      if (e.key === " " && characterRef.current && !isJumping.current) {
        velocity.current = 0.12;
        isJumping.current = true;
      }
    };

    const handleKeyUp = () => {
      direction.current = 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (headRef.current) {
      const material = headRef.current.material as MeshStandardMaterial;

      if (headTexture) {
        material.map = headTexture;
        material.color.set("#ffffff"); // 이미지 색상 그대로 표시
        material.transparent = false;
        material.needsUpdate = true;
      } else {
        material.map = null;
        material.color.set("#f0d9b5"); // 기본 스킨톤 복원
        material.transparent = false;
        material.needsUpdate = true;
      }
    }
  }, [headTexture]);

  // ✅ 애니메이션 처리
  useFrame((_, delta) => {
    if (!characterRef.current) return;

    const movement = direction.current * delta * 6;
    characterRef.current.position.z -= movement;
    characterRef.current.rotation.y = Math.PI;

    const z = characterRef.current.position.z;
    const moved = Math.abs(z - prevZ.current) > 0.001;
    isMoving.current = moved;
    prevZ.current = z;

    // 점프
    if (isJumping.current) {
      characterRef.current.position.y += velocity.current;
      velocity.current -= 0.01;
      if (characterRef.current.position.y <= 0.5) {
        characterRef.current.position.y = 0.5;
        velocity.current = 0;
        isJumping.current = false;
      }
    }

    // 시간 누적
    if (isMoving.current && !isJumping.current) {
      time.current += delta;
    }

    // ✅ 팔다리 애니메이션
    const swing = Math.sin(time.current * 10) * 0.6;
    const armSwingX = isJumping.current ? 0 : isMoving.current ? swing : 0;
    const legSwingX = isJumping.current
      ? Math.PI / 6
      : isMoving.current
      ? swing
      : 0;

    // jump 시 팔을 위로 드는 게 아닌, **정지 상태처럼 유지**
    const armSwingZ = 0;

    if (leftArm.current) {
      leftArm.current.rotation.x = -armSwingX;
      leftArm.current.rotation.z = armSwingZ;
    }
    if (rightArm.current) {
      rightArm.current.rotation.x = armSwingX;
      rightArm.current.rotation.z = -armSwingZ;
    }
    if (leftLeg.current) leftLeg.current.rotation.x = legSwingX;
    if (rightLeg.current) rightLeg.current.rotation.x = -legSwingX;
  });

  // ✅ 얼굴 클릭 → 이미지 업로드
  const handleHeadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // 🔒 확장자 제한 + 파일 크기 제한 (2MB)
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("2MB 이하의 이미지만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        new TextureLoader().load(imageUrl, (loadedTexture) => {
          loadedTexture.minFilter = LinearFilter;
          setHeadTexture(loadedTexture);
        });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  // ✅ 헤드 텍스처 리셋
  const handleResetTexture = () => {
    setHeadTexture(null);
  };

  return (
    <>
      {/* UI 버튼 추가 */}
      <Html position={[5, -5, 5]}>
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <button onClick={handleResetTexture}>🧼 헤드 리셋</button>
        </div>
      </Html>

      <group ref={characterRef} position={[0, 0.5, 5]} castShadow>
        <group rotation={[0, Math.PI, 0]}>
          {/* Head (클릭 시 이미지 업로드, 커서 설정 포함) */}
          <mesh
            ref={headRef}
            position={[0, 1.15, 0]}
            castShadow
            onClick={handleHeadClick}
            onPointerOver={(e) => (document.body.style.cursor = "pointer")}
            onPointerOut={(e) => (document.body.style.cursor = "default")}
          >
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

        {/* Arms */}
        <mesh ref={leftArm} position={[-0.42, 0.65, 0]} castShadow>
          <boxGeometry args={[0.24, 0.5, 0.2]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
        <mesh ref={rightArm} position={[0.42, 0.65, 0]} castShadow>
          <boxGeometry args={[0.24, 0.5, 0.2]} />
          <meshStandardMaterial color="yellow" />
        </mesh>

        {/* Legs */}
        <mesh ref={leftLeg} position={[-0.15, 0.05, -0.05]} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.15]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <mesh ref={rightLeg} position={[0.15, 0.05, -0.05]} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.15]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </group>
    </>
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
      <coneGeometry args={[3, 6, 32, 1, true]} />
      <meshStandardMaterial
        color="#ffffbb"
        transparent
        opacity={Math.min(intensity / 4, 0.8)}
        emissive={"#ffffcc"}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function LightFloorCircle({
  x,
  z,
  intensity,
}: {
  x: number;
  z: number;
  intensity: number;
}) {
  const texture = useLoader(TextureLoader, "/light-circle.png");

  return (
    <mesh
      position={[x + (x < 0 ? 3 : -4), 0.01, z - 0.5]}
      rotation={[-Math.PI / 2, 0, 0]}
      visible={intensity > 0}
    >
      <planeGeometry args={[20, 25]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={Math.min(intensity / 4, 0.5)}
        depthWrite={false}
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
    if (emissiveRef.current) {
      const mat = emissiveRef.current.material as any;
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
          emissive={new Color("#ffffaa")}
          emissiveIntensity={1}
        />
      </mesh>
      <spotLight
        ref={lightRef}
        position={[x + (x < 0 ? 0.5 : -0.5), poleHeight, z - 0.5]}
        angle={0.6}
        penumbra={0.8}
        distance={20}
        intensity={coneIntensity}
        castShadow
        color="#fffed9"
      />
      <LightCone
        position={[x + (x < 0 ? 0.5 : -0.5), poleHeight - 0.5, z - 0.5]}
        intensity={coneIntensity}
      />
      <LightFloorCircle x={x} z={z} intensity={coneIntensity} />
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
      {[-4.7, 4.7].map((x, i) => (
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

      {[...Array(8)].map((_, i) => {
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
