import { useState, useCallback } from "react";
import { AuthService } from "./authService";

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
        setError(err instanceof Error ? err.message : "알 수 없는 에러 발생");
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
        throw new Error("이메일을 입력해 주세요.");
      }
      await AuthService.sendSignUpCode(email);
      alert("인증 코드가 이메일로 발송되었습니다.");
      return true;
    });

  const verifySignUpCode = (email?: string, code?: string) =>
    handleAuthAsync(async () => {
      if (!email || email.trim() === "") {
        throw new Error("이메일을 입력해 주세요.");
      }
      if (!code || code.trim() === "") {
        throw new Error("인증 코드를 입력해 주세요.");
      }

      const token = await AuthService.verifySignUpCode(email, code);
      setSignupToken(token);
      setIsEmailVerified(true);
      alert("이메일 인증이 완료되었습니다.");
      return true;
    });

  const signUp = (name?: string, password?: string) =>
    handleAuthAsync(async () => {
      if (!signupToken) throw new Error("이메일 인증이 필요합니다.");
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
