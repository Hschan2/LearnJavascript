import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./features/home/home";
import Profile from "./features/user/profile";
import Login from "./features/auth/login";
import CreateAccount from "./features/auth/create-account";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import LoadingScreen from "./features/loading/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./routes/protected-route";
import Settings from "./features/setting/settings";
import Footer from "./shared/footer";
import Hot from "./features/tweet/hot";
import useDarkModeStore from "./shared/store/useDarkModeStore";
import Like from "./features/tweet/like";
import BottomMenu from "./layout/components/bottom-menu";
import WriteTweet from "./features/tweet/components/write-tweet";
import DetailTweet from "./features/tweet/detail";
import Update from "./features/tweet/update";
import Notification from "./features/notification/notification";
import Search from "./features/search/search";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "./features/error/error-boundary";
import NotFoundPage from "./features/error/not-found-page";
import InputEmail from "./features/auth/input-email";
import UserTweets from "./features/tweet/user-tweets";
import { darkTheme, GlobalStyles, lightTheme, Wrapper } from "./app-style";

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
        path: "user-tweets/:userId",
        element: (
          <ErrorBoundary>
            <UserTweets />
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

function App() {
  const [isLoading, setLoading] = useState(true);
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady();
      setLoading(false);
    };
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
      <Wrapper>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
