import React from "react";
import { Navigate } from "react-router";
import useAppStore from "../shared/store/useAppStore";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAppStore();

  if (isLoading) {
    return null; // App.tsx에서 전역 로딩 화면을 보여주므로 여기서는 아무것도 렌더링하지 않습니다.
  }

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
