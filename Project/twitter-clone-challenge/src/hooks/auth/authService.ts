import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

export const AuthService = (() => {
  const handleError = (error: FirebaseError): string => {
    switch (error.code) {
      case "auth/user-not-found":
        return "계정을 찾을 수 없습니다. 계정을 생성하세요.";
      case "auth/wrong-password":
        return "잘못된 비밀번호입니다. 다시 입력해주세요.";
      case "auth/email-already-in-use":
        return "이미 사용중인 이메일입니다.";
      default:
        return "인증에 실패했습니다. 다시 시도해주세요.";
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
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
        throw handleError(error);
      }
      throw new Error("회원가입: 알수 없는 에러 발생");
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("파이어베이스 에러: ", error);
        throw handleError(error);
      }
      console.error("알 수 없는 에러: ", error);
      throw new Error("로그인: 알수 없는 에러 발생");
    }
  };

  return {
    signUp,
    login,
  };
})();
