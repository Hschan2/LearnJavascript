import { useState, useCallback } from "react";
import { AuthService } from "../../../services/authService";
import { messages } from "../../../message";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const handleAuthAsync = useCallback(
    async (authAction: () => Promise<boolean>) => {
      setLoading(true);
      clearError();
      try {
        return await authAction();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : messages.serviceError.undefinedError
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signUp = (name: string, email: string, password: string) =>
    handleAuthAsync(async () => {
      if (!name || name.trim() === "") {
        throw new Error("이름을 입력해 주세요.");
      }
      if (!email || email.trim() === "") {
        throw new Error(messages.auth.inputEmail);
      }
      if (!password || password.trim() === "") {
        throw new Error("비밀번호를 입력해 주세요.");
      }
      await AuthService.signUp(name, email, password);
      return true;
    });

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
