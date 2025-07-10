import { useState } from "react";
import { ControlsPanel } from "./components/ControlsPanel";
import { ProductViewer } from "./components/ProductViewer";

function App() {
  const [modelPath, setModelPath] = useState("/model/robot.glb");
  const [texturePath, setTexturePath] = useState("/textures/wood.jpg");
  const [environment, setEnvironment] = useState<
    "sunset" | "city" | "warehouse"
  >("warehouse");

  const isAnimatedModel = modelPath.includes("robot"); // 단순 체크

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🛍️ 3D 제품 뷰어</h1>
      <ControlsPanel
        modelPath={modelPath}
        setModelPath={setModelPath}
        texturePath={texturePath}
        setTexturePath={setTexturePath}
        environment={environment}
        setEnvironment={setEnvironment}
      />
      <ProductViewer
        modelPath={modelPath}
        texturePath={texturePath}
        environment={environment}
        isAnimated={isAnimatedModel}
      />
    </div>
  );
}

export default App;
