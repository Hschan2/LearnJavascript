import { User } from "firebase/auth";
import { getDocument, setDocument } from "../../../services/databaseService";
import { INITIAL_IMAGE } from "../../../constants";
import { userConverter } from "../../../lib/converters";

export const saveUserToFirestore = async (user: User, name?: string) => {
  const userSnap = await getDocument(["signedUsers", user.uid], userConverter);

  if (!userSnap.exists()) {
    const newUser = {
      uid: user.uid,
      name: name || user.displayName || "사용자",
      email: user.email,
      avatar: INITIAL_IMAGE,
      createdAt: new Date(),
    };
    await setDocument(["signedUsers", user.uid], newUser, userConverter);
  }
};
