import { User } from "firebase/auth";
import { INITIAL_IMAGE } from "../../constants";
import { getDocument } from "../../services/databaseService";

export const fetchAvatarUrl = async (user: User | null): Promise<string> => {
  if (!user) return INITIAL_IMAGE;

  const userSnap = await getDocument(["signedUsers", user.uid]);

  return userSnap.exists() && userSnap.data().avatar
    ? userSnap.data().avatar
    : INITIAL_IMAGE;
};
