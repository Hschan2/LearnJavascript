import React, { useMemo, useRef } from "react";
import { ExtrudeGeometry, Group, Mesh, Shape } from "three";
import { useFrame } from "@react-three/fiber";

const BOX_COUNT = 8;

export default function BoxGroup() {
  const groupRef = useRef<Group>(null!);
  const spheresRef = useRef<Mesh[]>([]);

  // 애니메이션 프레임
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 개별 공의 y 위치를 애니메이션
    spheresRef.current.forEach((sphere, i) => {
      const offset = i * 0.5;
      sphere.position.y = Math.sin(t * 4 + offset) * 0.8;
    });
  });

  const hollowBoxGeometry = useMemo(() => {
    const outerSize = 0.8;
    const holeRadius = 0.2;

    const shape = new Shape();
    shape.moveTo(-outerSize / 2, -outerSize / 2);
    shape.lineTo(-outerSize / 2, outerSize / 2);
    shape.lineTo(outerSize / 2, outerSize / 2);
    shape.lineTo(outerSize / 2, -outerSize / 2);
    shape.lineTo(-outerSize / 2, -outerSize / 2);

    // 가운데 원형 구멍
    const holePath = new Shape();
    holePath.absellipse(0, 0, holeRadius, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    return new ExtrudeGeometry(shape, {
      depth: 0.2,
      bevelEnabled: false,
    });
  }, []);

  return (
    <group ref={groupRef}>
      {Array.from({ length: BOX_COUNT }).map((_, i) => (
        <group key={i} position={[i - BOX_COUNT / 2, 0, 0]}>
          {/* 가운데 구멍이 뚫린 사각형 */}
          <mesh
            geometry={hollowBoxGeometry}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow={false}
            receiveShadow={false}
          >
            <meshStandardMaterial color="#FFA500" />
          </mesh>

          {/* 위아래로 움직이는 공 */}
          <mesh
            ref={(el) => {
              if (el) spheresRef.current[i] = el;
            }}
            position={[0, 0.6, 0]}
            castShadow
          >
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#00BFFF" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
