import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, dataBase } from "../../../firebase";
import { deleteUser, updateProfile } from "firebase/auth";

export const logoutUser = async () => {
  if (!auth.currentUser) throw new Error("로그아웃 할 수 없습니다.");
  await auth.signOut();
};

export const deleteUserAccount = async (userId: string) => {
  if (!userId) throw new Error("삭제할 계정이 없습니다.");

  const tweetQuery = query(
    collection(dataBase, "tweets"),
    where("userId", "==", userId)
  );
  try {
    const tweetDocs = await getDocs(tweetQuery);
    for (const tweetDoc of tweetDocs.docs) {
      await deleteDoc(tweetDoc.ref);
    }
  } catch (error) {
    console.error("탈퇴회원 Tweet 삭제 에러", error);
  }

  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, { displayName: null, photoURL: null });
    await deleteUser(user);
  }
};
