import React from "react";
import RunningRoadScene from "../components/RunningRoadScene";
import { useNavigate } from "react-router-dom";

export default function Run() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <RunningRoadScene />
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          padding: "12px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← 홈으로 돌아가기
      </button>
    </div>
  );
}
