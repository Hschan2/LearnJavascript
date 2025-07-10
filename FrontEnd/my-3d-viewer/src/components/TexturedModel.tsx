import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, MeshStandardMaterial } from "three";

type Props = {
  modelPath: string;
  texturePath: string;
};

export const TexturedModel = ({ modelPath, texturePath }: Props) => {
  const group = useRef<Group>(null!);

  try {
    const { scene } = useGLTF(modelPath);
    const texture = useTexture(texturePath);

    useEffect(() => {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          (child.material as MeshStandardMaterial).map = texture;
          child.material.needsUpdate = true;
        }
      });
    }, [scene, texture]);

    return <primitive ref={group} object={scene} scale={1.5} />;
  } catch {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    );
  }
};
