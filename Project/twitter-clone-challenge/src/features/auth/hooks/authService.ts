import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  confirmPasswordReset as fbConfirmPasswordReset,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { where } from "firebase/firestore";
import axios from "axios";
import { saveUserToFirestore } from "./saveUserToFirestore";
import { updateUserProfile } from "./updateUserProfile";
import { getDocuments } from "../../../services/databaseService";
import { messages } from "../../../message";

export const AuthService = (() => {
  const sendSignUpCode = async (email: string) => {
    const res = await axios.post("/send-signup-code", { email });
    if (!res.data.success)
      throw new Error(res.data.error || messages.apiError.failedCodeEmail);
  };

  const verifySignUpCode = async (
    email: string,
    code: string
  ): Promise<string> => {
    const res = await axios.post("/verify-signup-code", { email, code });
    if (!res.data.success || !res.data.token)
      throw new Error(res.data.error || messages.apiError.failedVerify);
    return res.data.token;
  };

  const signUpWithToken = async (
    name: string,
    password: string,
    token: string
  ) => {
    const res = await axios.post("/signup", { name, password, token });
    if (!res.data.success)
      throw new Error(res.data.error || messages.apiError.failedSign);
  };

  const handleError = (error: FirebaseError | Error): string => {
    console.error("인증 오류:", error.message);

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          return messages.authServiceError.userNotFount;
        case "auth/wrong-password":
          return messages.authServiceError.wrongPassword;
        case "auth/invalid-email":
          return messages.authServiceError.invalidEmail;
        case "auth/invalid-login-credentials":
          return messages.authServiceError.invalidLoginCredentials;
        case "auth/email-already-in-use":
          return messages.authServiceError.alreadyUseEmail;
        case "auth/network-request-failed":
          return messages.authServiceError.networkRequestFailed;
        case "auth/invalid-action-code":
          return messages.authServiceError.invalidActionCode;
        case "auth/expired-action-code":
          return messages.authServiceError.expiredActionCode;
        case "auth/user-disabled":
          return messages.authServiceError.userDisabled;
        case "auth/weak-password":
          return messages.authServiceError.weakPassword;
        default:
          return messages.authServiceError.failedAuth;
      }
    }

    return error.message || messages.serviceError.undefinedError;
  };

  const checkDuplicate = async (name: string, email: string) => {
    const [nameSnapshot, emailSnapshot] = await Promise.all([
      getDocuments(["signedUsers"], where("name", "==", name)),
      getDocuments(["signedUsers"], where("email", "==", email)),
    ]);

    if (!nameSnapshot.empty)
      throw new Error(messages.apiError.alreadySignedName);
    if (!emailSnapshot.empty)
      throw new Error(messages.apiError.alreadySignedEmail);
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
    const actionCodeSettings = {
      url: `${window.location.origin}/reset-password`,
      handleCodeInApp: true,
    };
    try {
      await fbSendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error) {
      console.error("비밀번호 재설정 이메일 오류:", error);
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
