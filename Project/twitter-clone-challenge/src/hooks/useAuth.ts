import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuthError = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/user-not-found":
        setError("계정을 찾을 수 없습니다. 계정을 생성하세요.");
        break;
      case "auth/wrong-password":
        setError("잘못된 비밀번호입니다. 다시 입력해주세요.");
        break;
      case "auth/email-already-in-use":
        setError("이미 사용중인 이메일입니다.");
        break;
      default:
        setError("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, { displayName: name });
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      }
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      }
      return false;
    }
  };

  const clearError = () => setError("");

  const trueLoading = () => setLoading(true);

  const falseLoading = () => setLoading(false);

  useEffect(() => {
    setLoading(false);
  }, [isLoading]);

  return {
    isLoading,
    error,
    signUp,
    login,
    clearError,
    trueLoading,
    falseLoading,
  };
};
