import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { dataBase } from "../../firebase";
import { INITIAL_IMAGE } from "../../constants";

export const fetchAvatarUrl = async (user: User | null): Promise<string> => {
  if (!user) return INITIAL_IMAGE;

  const userRef = doc(dataBase, "signedUsers", user.uid);
  const userSnap = await getDoc(userRef);

  return userSnap.exists() && userSnap.data().avatar
    ? userSnap.data().avatar
    : INITIAL_IMAGE;
};
