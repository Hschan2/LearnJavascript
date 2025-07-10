type Props = {
  modelPath: string;
  setModelPath: (path: string) => void;
  texturePath: string;
  setTexturePath: (path: string) => void;
  environment: string;
  setEnvironment: (env: "sunset" | "city" | "warehouse") => void;
};

export const ControlsPanel = ({
  modelPath,
  setModelPath,
  texturePath,
  setTexturePath,
  environment,
  setEnvironment,
}: Props) => {
  return (
    <div style={{ margin: "1rem" }}>
      <label>
        모델 선택:{" "}
        <select
          value={modelPath}
          onChange={(e) => setModelPath(e.target.value)}
        >
          <option value="/model/robot.glb">🤖 Robot (애니메이션)</option>
          <option value="/model/chair.glb">🪑 Chair (텍스처 매핑)</option>
          <option value="invalid">❌ 오류 모델 (Fallback 테스트)</option>
        </select>
      </label>

      <br />

      <label>
        텍스처 선택:{" "}
        <select
          value={texturePath}
          onChange={(e) => setTexturePath(e.target.value)}
        >
          <option value="/textures/wood.jpg">Wood</option>
          <option value="/textures/fabric.jpg">Fabric</option>
          <option value="/textures/metal.jpg">Metal</option>
        </select>
      </label>

      <br />

      <label>
        배경 선택:{" "}
        <select
          value={environment}
          onChange={(e) =>
            setEnvironment(e.target.value as "sunset" | "city" | "warehouse")
          }
        >
          <option value="warehouse">Warehouse</option>
          <option value="sunset">Sunset</option>
          <option value="city">City</option>
        </select>
      </label>
    </div>
  );
};
