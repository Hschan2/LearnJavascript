import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/screen/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/screen/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/route/protected-route";
import Settings from "./routes/settings";
import Footer from "./components/screen/footer";
import Hot from "./routes/hot";
import useDarkModeStore from "./components/store/useDarkModeStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "hot",
        element: <Hot />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle<{ dark?: string }>`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => (props.dark === "true" ? "#000" : "#fff")};;
    color: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: 0.2s;
  }
  &.darkMode {
    background-color: ${(props) => (props.dark === "true" ? "#000" : "#fff")};;
    color: ${(props) => (props.dark === "true" ? "#fff" : "#111111")};
    transition: 0.2s;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const { darkMode } = useDarkModeStore();
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles dark={darkMode.toString()} />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      <Footer />
    </Wrapper>
  );
}

export default App;
