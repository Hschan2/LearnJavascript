import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoxGroup from "./components/BoxGroup";

export default function CanvasContainer() {
  return (
    <Canvas
      shadows // 그림자 활성화
      camera={{ position: [5, 5, 5], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* 조명 설정 (그림자 지원) */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[2, 5, 2]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 공 및 박스 */}
      <Suspense fallback={null}>
        <BoxGroup />
      </Suspense>

      {/* 그림자를 받는 바닥 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.6, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      {/* 마우스 회전 및 줌 */}
      <OrbitControls enableZoom enablePan={false} autoRotate={false} />
    </Canvas>
  );
}
