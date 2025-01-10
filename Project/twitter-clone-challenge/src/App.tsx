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
import Like from "./routes/like";
import BottomMenu from "./components/utils/bottom-menu";
import WriteTweet from "./components/screen/write-tweet";
import DetailTweet from "./routes/detail";
import Update from "./routes/update";
import Notification from "./routes/notification";
import Search from "./routes/search";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "./components/route/error-boundary";
import NotFoundPage from "./components/route/not-found-page";
import InputEmail from "./routes/input-email";
import { NotificationMessageProvider } from "./components/utils/notificationMessageContext";
import NotificationPopup from "./components/utils/notificationPopup";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <Layout />
          <BottomMenu />
        </ErrorBoundary>
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
        path: "write",
        element: <WriteTweet />,
      },
      {
        path: "hot",
        element: <Hot />,
      },
      {
        path: "like",
        element: <Like />,
      },
      {
        path: "detail/:tweetId",
        element: (
          <ErrorBoundary>
            <DetailTweet />
          </ErrorBoundary>
        ),
      },
      {
        path: "update/:tweetId",
        element: (
          <ErrorBoundary>
            <Update />
          </ErrorBoundary>
        ),
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    ),
  },
  {
    path: "/create-account",
    element: (
      <ErrorBoundary>
        <CreateAccount />
      </ErrorBoundary>
    ),
  },
  {
    path: "/input-email",
    element: (
      <ErrorBoundary>
        <InputEmail />
      </ErrorBoundary>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ErrorBoundary>
        <CreateAccount />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
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
    font-family: 'Noto Sans KR', sans-serif;
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
  padding: 0 24px;

  @media (max-width: 425px) {
    padding: 0 12px;
  }
`;

const lightTheme = {
  background: "#FFF",
  text: "#111111",
  lightText: "#767676",
  light: "rgba(0, 0, 0, 0.1)",
  border: "#111111",
  hover: "#FFFCFA",
};

const darkTheme = {
  background: "#000",
  text: "#FAF8F6",
  lightText: "#C1C1C1",
  light: "rgba(255, 255, 255, 0.2)",
  border: "#FAF8F6",
  hover: "#111",
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
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Noto+Sans+KR:wght@100..900&display=swap"
        />
      </Helmet>
      <NotificationMessageProvider>
        <Wrapper>
          <GlobalStyles />
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <NotificationPopup />
              <RouterProvider router={router} />
            </>
          )}
          <Footer />
        </Wrapper>
      </NotificationMessageProvider>
    </ThemeProvider>
  );
}

export default App;
