import { deleteUser, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import { clearAllFirestoreSubscriptions } from "../../../lib/firestoreSubscriptions";
import { getDocuments, deleteDocument } from "../../../services/databaseService";
import { where } from "firebase/firestore";

export const logoutUser = async () => {
  clearAllFirestoreSubscriptions();
  if (!auth.currentUser) throw new Error("로그아웃 할 수 없습니다.");
  await auth.signOut();
};

export const deleteUserAccount = async (userId: string) => {
  if (!userId) throw new Error("삭제할 계정이 없습니다.");
  if (!auth.currentUser) return;

  const tweetDocsSnapshot = await getDocuments(
    ["tweets"],
    where("userId", "==", userId)
  );
  try {
    const tweetDocs = tweetDocsSnapshot;
    for (const tweetDoc of tweetDocs.docs) {
      await deleteDocument(tweetDoc.ref.path.split("/"));
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
