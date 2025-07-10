import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";

type Props = {
  modelPath: string;
};

export const AnimatedModel = ({ modelPath }: Props) => {
  const group = useRef<Group>(null!);
  try {
    const { scene, animations } = useGLTF(modelPath);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
      if (animations.length > 0) {
        actions[animations[0].name]?.play();
      }
    }, [actions, animations]);

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
