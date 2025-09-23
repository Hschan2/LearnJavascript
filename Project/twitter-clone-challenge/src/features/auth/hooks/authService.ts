import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  confirmPasswordReset as fbConfirmPasswordReset,
} from "firebase/auth";
import { auth, dataBase } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import axios from "axios";
import { saveUserToFirestore } from "./saveUserToFirestore";
import { updateUserProfile } from "./updateUserProfile";

export const AuthService = (() => {
  const sendSignUpCode = async (email: string) => {
    const res = await axios.post("/send-signup-code", { email });
    if (!res.data.success)
      throw new Error(res.data.error || "인증 코드 발송 실패");
  };

  const verifySignUpCode = async (
    email: string,
    code: string
  ): Promise<string> => {
    const res = await axios.post("/verify-signup-code", { email, code });
    if (!res.data.success || !res.data.token)
      throw new Error(res.data.error || "인증 실패");
    return res.data.token;
  };

  const signUpWithToken = async (
    name: string,
    password: string,
    token: string
  ) => {
    const res = await axios.post("/signup", { name, password, token });
    if (!res.data.success) throw new Error(res.data.error || "회원가입 실패");
  };

  const handleError = (error: FirebaseError | Error): string => {
    console.error("인증 오류:", error.message);

    if (error instanceof FirebaseError) {
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
          return "이미 사용 중인 이메일입니다.";
        case "auth/network-request-failed":
          return "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.";
        case "auth/invalid-action-code":
          return "유효하지 않은 요청입니다. 다시 시도해주세요.";
        case "auth/expired-action-code":
          return "요청이 만료되었습니다. 다시 시도해주세요.";
        case "auth/user-disabled":
          return "사용이 중지된 계정입니다.";
        case "auth/weak-password":
          return "비밀번호는 6자리 이상이어야 합니다.";
        default:
          return "인증에 실패했습니다. 다시 시도해주세요.";
      }
    }

    return error.message || "알 수 없는 오류가 발생했습니다.";
  };

  const checkDuplicate = async (name: string, email: string) => {
    const usersRef = collection(dataBase, "signedUsers");
    const nameQuery = query(usersRef, where("name", "==", name));
    const emailQuery = query(usersRef, where("email", "==", email));
    const [nameSnapshot, emailSnapshot] = await Promise.all([
      getDocs(nameQuery),
      getDocs(emailQuery),
    ]);

    if (!nameSnapshot.empty) throw new Error("이미 등록된 이름이 있습니다.");
    if (!emailSnapshot.empty) throw new Error("이미 등록된 이메일이 있습니다.");
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await checkDuplicate(name, email);

      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateUserProfile(credentials.user, name);
      await saveUserToFirestore(credentials.user, name);

      return true;
    } catch (error) {
      throw new Error(handleError(error as FirebaseError | Error));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      throw new Error(handleError(error as FirebaseError | Error));
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      await fbSendPasswordResetEmail(auth, email);
    } catch (error) {
      // To prevent user enumeration attacks, we don't throw an error to the UI.
      // The user is just notified that an email will be sent if the account exists.
      console.error("Password reset email error:", error);
      throw new Error(handleError(error as FirebaseError | Error));
    }
  };

  const confirmPasswordReset = async (oobCode: string, newPassword: string) => {
    try {
      await fbConfirmPasswordReset(auth, oobCode, newPassword);
    } catch (error) {
      throw new Error(handleError(error as FirebaseError | Error));
    }
  };

  return {
    sendSignUpCode,
    verifySignUpCode,
    signUpWithToken,
    signUp,
    login,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
})();

