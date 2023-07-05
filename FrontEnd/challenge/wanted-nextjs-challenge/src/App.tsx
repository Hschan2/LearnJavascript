import { useEffect } from "react";
import {
  Routes,
  Route,
} from "../node_modules/react-router-dom/dist/index";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    window.onpopstate = () => {
      window.location.href = window.location.pathname;
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
