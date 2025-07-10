import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Suspense } from "react";
import { TexturedModel } from "./TexturedModel";
import { AnimatedModel } from "./AnimatedModel";

type Props = {
  modelPath: string;
  texturePath: string;
  environment: "sunset" | "city" | "warehouse";
  isAnimated: boolean;
};

export const ProductViewer = ({
  modelPath,
  texturePath,
  environment,
  isAnimated,
}: Props) => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <Suspense fallback={<Html center>Loading model...</Html>}>
          {isAnimated ? (
            <AnimatedModel modelPath={modelPath} />
          ) : (
            <TexturedModel modelPath={modelPath} texturePath={texturePath} />
          )}
          <Environment preset={environment} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};
