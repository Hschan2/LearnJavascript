import React from "react";
import { Route, Routes } from "react-router";
import Home from "./routes/Home";
import Run from "./routes/Run";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/run" element={<Run />} />
    </Routes>
  );
}
