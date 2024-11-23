import { useState, useCallback } from "react";
import { AuthService } from "./authService";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const handleAuthAsync = useCallback(
    async (authAction: () => Promise<boolean>) => {
      setLoading(true);
      clearError();
      try {
        const success = await authAction();
        return success;
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 에러 발생");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signUp = (name: string, email: string, password: string) =>
    handleAuthAsync(() => AuthService.signUp(name, email, password));

  const login = (email: string, password: string) =>
    handleAuthAsync(() => AuthService.login(email, password));

  return {
    signUp,
    login,
    isLoading,
    error,
    clearError,
  };
};
