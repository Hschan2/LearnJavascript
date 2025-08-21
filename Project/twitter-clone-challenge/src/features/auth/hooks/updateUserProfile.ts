import { updateProfile, User } from "firebase/auth";
import { INITIAL_IMAGE } from "../../../constants";

export const updateUserProfile = async (user: User, name?: string) => {
  const newProfile = {
    displayName: user.displayName || name || "사용자",
    photoURL: INITIAL_IMAGE,
  };

  if (!user.displayName || !user.photoURL) {
    await updateProfile(user, newProfile);
  }
};
