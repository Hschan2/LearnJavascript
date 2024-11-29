import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

export const AuthService = (() => {
  const handleError = (error: FirebaseError): string => {
    console.error("파이어베이스 에러:", error.message);
    switch (error.code) {
      case "auth/user-not-found":
        return "해당 이메일로 등록된 계정이 없습니다.";
      case "auth/wrong-password":
        return "비밀번호가 잘못되었습니다.";
      case "auth/invalid-email":
        return "유효하지 않은 이메일 형식입니다.";
      case "auth/invalid-login-credentials":
        return "이메일 또는 비밀번호가 올바르지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 사용중인 이메일입니다.";
      case "auth/network-request-failed":
        return "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.";
      default:
        return "인증에 실패했습니다. 다시 시도해주세요.";
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const initialImage =
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbxwsqs%2FbtsK1ACfsyI%2FyojjVvJwKpX4bdZ0CtZkJ0%2Fimg.png";
      await updateProfile(credentials.user, {
        displayName: name,
        photoURL: initialImage,
      });
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(handleError(error));
      }
      throw new Error("회원가입: 알수 없는 에러 발생");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(handleError(error));
      }
      throw new Error("로그인 실패: 알 수 없는 에러 발생");
    }
  };

  return {
    signUp,
    login,
  };
})();
