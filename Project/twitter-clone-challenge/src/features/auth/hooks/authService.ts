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
import {
  API_ERROR_MESSAGE,
  AUTH_SERVICE_ERROR_MESSAGE,
  SERVICE_ERROR_MESSAGE,
} from "../../../message";

export const AuthService = (() => {
  const sendSignUpCode = async (email: string) => {
    const res = await axios.post("/send-signup-code", { email });
    if (!res.data.success)
      throw new Error(res.data.error || API_ERROR_MESSAGE.FAILED_CODE_EMAIL);
  };

  const verifySignUpCode = async (
    email: string,
    code: string
  ): Promise<string> => {
    const res = await axios.post("/verify-signup-code", { email, code });
    if (!res.data.success || !res.data.token)
      throw new Error(res.data.error || API_ERROR_MESSAGE.FAILED_VERIFY);
    return res.data.token;
  };

  const signUpWithToken = async (
    name: string,
    password: string,
    token: string
  ) => {
    const res = await axios.post("/signup", { name, password, token });
    if (!res.data.success)
      throw new Error(res.data.error || API_ERROR_MESSAGE.FAILED_SIGN);
  };

  const handleError = (error: FirebaseError | Error): string => {
    console.error("인증 오류:", error.message);

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          return AUTH_SERVICE_ERROR_MESSAGE.USER_NOT_FOUNT;
        case "auth/wrong-password":
          return AUTH_SERVICE_ERROR_MESSAGE.WRONG_PASSWORD;
        case "auth/invalid-email":
          return AUTH_SERVICE_ERROR_MESSAGE.INVALID_EMAIL;
        case "auth/invalid-login-credentials":
          return AUTH_SERVICE_ERROR_MESSAGE.INVALID_LOGIN_CREDENTIALS;
        case "auth/email-already-in-use":
          return AUTH_SERVICE_ERROR_MESSAGE.ALREADY_USE_EMAIL;
        case "auth/network-request-failed":
          return AUTH_SERVICE_ERROR_MESSAGE.NETWORK_REQUEST_FAILED;
        case "auth/invalid-action-code":
          return AUTH_SERVICE_ERROR_MESSAGE.INVALID_ACTION_CODE;
        case "auth/expired-action-code":
          return AUTH_SERVICE_ERROR_MESSAGE.EXPIRED_ACTION_CODE;
        case "auth/user-disabled":
          return AUTH_SERVICE_ERROR_MESSAGE.USER_DISABLED;
        case "auth/weak-password":
          return AUTH_SERVICE_ERROR_MESSAGE.WEAK_PASSWORD;
        default:
          return AUTH_SERVICE_ERROR_MESSAGE.FAILED_AUTH;
      }
    }

    return error.message || SERVICE_ERROR_MESSAGE.UNDEFINED_ERROR;
  };

  const checkDuplicate = async (name: string, email: string) => {
    const [nameSnapshot, emailSnapshot] = await Promise.all([
      getDocuments(["signedUsers"], where("name", "==", name)),
      getDocuments(["signedUsers"], where("email", "==", email)),
    ]);

    if (!nameSnapshot.empty)
      throw new Error(API_ERROR_MESSAGE.ALREADY_SIGNED_NAME);
    if (!emailSnapshot.empty)
      throw new Error(API_ERROR_MESSAGE.ALREADY_SIGNED_EMAIL);
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
