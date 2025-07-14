import React from "react";
import { useNavigate } from "react-router-dom";
import CanvasContainer from "../CanvasContainer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <CanvasContainer />
      <button
        onClick={() => navigate("/run")}
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          padding: "12px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        달리기 씬으로 이동 →
      </button>
    </div>
  );
}
