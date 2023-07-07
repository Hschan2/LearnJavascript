import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Routes from "./components/Routes";
import Route from "./components/Route";

function App() {
  return (
    <Routes>
      <Route path="/" component={<Home />} />
      <Route path="/about" component={<About />} />
    </Routes>
  );
}

export default App;
