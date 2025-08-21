import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { dataBase } from "../../../firebase";
import { INITIAL_IMAGE } from "../../../constants";

export const saveUserToFirestore = async (user: User, name?: string) => {
  const userRef = doc(dataBase, "signedUsers", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: name || user.displayName || "사용자",
      email: user.email,
      avatar: INITIAL_IMAGE,
      createdAt: new Date(),
    });
  }
};
