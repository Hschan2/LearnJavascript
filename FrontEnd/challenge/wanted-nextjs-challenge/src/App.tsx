import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Route from "./components/Route";
import Router from "./components/Router";
import Count from "./pages/Count";

function App() {
  return (
    <Router>
      <Route path="/" component={<Home />} />
      <Route path="/about" component={<About />} />
      <Route path="/count" component={<Count />} />
    </Router>
  );
}

export default App;
