import { useState, useCallback } from "react";
import { AuthService } from "./authService";
import { AUTH_MESSAGE, SERVICE_ERROR_MESSAGE } from "../../../message";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [signupToken, setSignupToken] = useState<string | null>(null);

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
            : SERVICE_ERROR_MESSAGE.UNDEFINED_ERROR
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const sendSignUpCode = (email: string) =>
    handleAuthAsync(async () => {
      if (!email || email.trim() === "") {
        throw new Error(AUTH_MESSAGE.INPUT_EMAIL);
      }
      await AuthService.sendSignUpCode(email);
      alert(AUTH_MESSAGE.SEND_VERIFY_CODE);
      return true;
    });

  const verifySignUpCode = (email?: string, code?: string) =>
    handleAuthAsync(async () => {
      if (!email || email.trim() === "") {
        throw new Error(AUTH_MESSAGE.INPUT_EMAIL);
      }
      if (!code || code.trim() === "") {
        throw new Error(AUTH_MESSAGE.INPUT_VERIFY_CODE);
      }

      const token = await AuthService.verifySignUpCode(email, code);
      setSignupToken(token);
      setIsEmailVerified(true);
      alert(AUTH_MESSAGE.SUCCESS_VERIFY_EMAIL);
      return true;
    });

  const signUp = (name?: string, password?: string) =>
    handleAuthAsync(async () => {
      if (!signupToken) throw new Error(AUTH_MESSAGE.NEEDED_VERIFY_EMAIL);
      await AuthService.signUpWithToken(name!, password!, signupToken);
      return true;
    });

  // const signUp = (name: string, email: string, password: string) =>
  //   handleAuthAsync(() => AuthService.signUp(name, email, password));

  const login = (email: string, password: string) =>
    handleAuthAsync(() => AuthService.login(email, password));

  return {
    sendSignUpCode,
    verifySignUpCode,
    signUp,
    login,
    isLoading,
    error,
    clearError,
    isEmailVerified,
  };
};
