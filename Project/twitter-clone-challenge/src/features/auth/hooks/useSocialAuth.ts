import { AuthProvider, signInWithPopup } from "firebase/auth";
import { UserService } from "../../../services/userService";
import { useNavigate } from "react-router";
import { auth } from "../../../firebase";

export const useSocialAuth = () => {
  const navigate = useNavigate();

  const socialWithProvider = async (provider: AuthProvider) => {
    const result = await signInWithPopup(auth, provider);

    await UserService.updateUserProfile(result.user);
    await UserService.saveUserToFirestore(result.user);
    navigate("/");
  };

  return { socialWithProvider };
};
