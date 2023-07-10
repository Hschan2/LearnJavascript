import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Route from "./components/Route";
import Router from "./components/Router";
import Count from "./pages/Count";
import Routes from "./components/Routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={<Home />} />
        <Route path="/about" component={<About />} />
        <Route path="/count" component={<Count />} />
      </Routes>
    </Router>
  );
}

export default App;
