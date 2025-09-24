import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import Home from "../features/home/home";
import Profile from "../features/user/profile";
import Login from "../features/auth/login";
import CreateAccount from "../features/auth/create-account";
import ResetPassword from "../features/auth/reset-password";
import ProtectedRoute from "./protected-route";
import BottomMenu from "../layout/components/bottom-menu";
import Settings from "../features/setting/settings";
import Hot from "../features/tweet/hot";
import Like from "../features/tweet/like";
import DetailTweet from "../features/tweet/detail";
import Update from "../features/tweet/update";
import UserTweets from "../features/tweet/user-tweets";
import Notification from "../features/notification/notification";
import Search from "../features/search/search";
import NotFoundPage from "../features/error/not-found-page";
import InputEmail from "../features/auth/input-email";
import WriteTweet from "../features/tweet/components/write-tweet";
import ErrorBoundary from "../features/error/error-boundary";

import ActionHandler from "../features/auth/action-handler";
import ResetInputEmail from "../features/auth/reset-input-email";

export const router = createBrowserRouter([
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
    path: "/reset-input-email",
    element: (
      <ErrorBoundary>
        <ResetInputEmail />
      </ErrorBoundary>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ErrorBoundary>
        <ResetPassword />
      </ErrorBoundary>
    ),
  },
  {
    path: "/action",
    element: (
      <ErrorBoundary>
        <ActionHandler />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
