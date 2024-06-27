import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/screen/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle, styled, ThemeProvider } from "styled-components";
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

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: 0.2s;
  }
  &.darkMode {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: 0.2s;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  padding: 0 48px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  @media (max-width: 375px) {
    padding: 0 20px;
  }
`;

const lightTheme = {
  background: "#FFF",
  text: "#111111",
  light: "rgba(0, 0, 0, 0.1)",
  border: "#111111",
  hover: "#FFFCFA",
};

const darkTheme = {
  background: "#000",
  text: "#FAF8F6",
  light: "rgba(255, 255, 255, 0.2)",
  border: "#FAF8F6",
  hover: "#111"
};

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
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Wrapper>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
