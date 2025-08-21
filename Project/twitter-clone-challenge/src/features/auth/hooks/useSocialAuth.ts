import { AuthProvider, signInWithPopup } from "firebase/auth";
import { saveUserToFirestore } from "./saveUserToFirestore";
import { updateUserProfile } from "./updateUserProfile";
import { useNavigate } from "react-router";
import { auth } from "../../../firebase";

export const useSocialAuth = () => {
  const navigate = useNavigate();

  const socialWithProvider = async (provider: AuthProvider) => {
    const result = await signInWithPopup(auth, provider);

    await updateUserProfile(result.user);
    await saveUserToFirestore(result.user);
    navigate("/");
  };

  return { socialWithProvider };
};
