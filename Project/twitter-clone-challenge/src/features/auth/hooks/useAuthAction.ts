import { useState, useCallback } from "react";
import { AuthService } from "./authService";
import { messages } from "../../../message";

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
            : messages.serviceError.undefinedError
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
        throw new Error(messages.auth.inputEmail);
      }
      await AuthService.sendSignUpCode(email);
      alert(messages.auth.sendVerifyCode);
      return true;
    });

  const verifySignUpCode = (email?: string, code?: string) =>
    handleAuthAsync(async () => {
      if (!email || email.trim() === "") {
        throw new Error(messages.auth.inputEmail);
      }
      if (!code || code.trim() === "") {
        throw new Error(messages.auth.inputVerifyCode);
      }

      const token = await AuthService.verifySignUpCode(email, code);
      setSignupToken(token);
      setIsEmailVerified(true);
      alert(messages.auth.successVerifyEmail);
      return true;
    });

  const signUp = (name?: string, password?: string) =>
    handleAuthAsync(async () => {
      if (!signupToken) throw new Error(messages.auth.neededVerifyEmail);
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
