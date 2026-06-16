import { updateProfile, User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getDocument, setDocument, updateDocument } from "./databaseService";
import { INITIAL_IMAGE } from "../constants";
import { userConverter } from "../lib/converters";
import { dataBase } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { IUser } from "../features/user/types/user-type";

/**
 * 유저 프로필 정보를 Firestore에 저장 (중복 체크 포함)
 */
export const saveUserToFirestore = async (user: User, name?: string) => {
  const userSnap = await getDocument(["signedUsers", user.uid], userConverter);

  if (!userSnap.exists()) {
    const newUser = {
      uid: user.uid,
      name: name || user.displayName || "사용자",
      email: user.email,
      avatar: INITIAL_IMAGE,
      createdAt: Date.now(),
    } as IUser;
    await setDocument(["signedUsers", user.uid], newUser, userConverter);
  }
};

/**
 * 유저의 Auth 프로필(DisplayName, PhotoURL) 업데이트
 */
export const updateUserProfile = async (user: User, name?: string) => {
  const newProfile = {
    displayName: user.displayName || name || "사용자",
    photoURL: user.photoURL || INITIAL_IMAGE,
  };

  if (!user.displayName || !user.photoURL) {
    await updateProfile(user, newProfile);
  }
};

/**
 * 유저 아바타 이미지 업데이트
 */
export const updateUserAvatar = async (user: User, avatarUrl: string) => {
  await updateProfile(user, { photoURL: avatarUrl });
  await updateDocument(["signedUsers", user.uid], {
    avatar: avatarUrl,
  });
};

/**
 * 특정 유저 데이터 가져오기
 */
export const getUserData = async (uid: string): Promise<IUser | null> => {
  const snap = await getDocument(["signedUsers", uid], userConverter);
  return snap.exists() ? snap.data() : null;
};

/**
 * 실시간 유저 데이터 구독
 */
export const subscribeToUser = (uid: string, callback: (data: IUser) => void) => {
  const userRef = doc(dataBase, "signedUsers", uid).withConverter(userConverter);
  return onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
};

/**
 * 유저 관련 통합 서비스
 */
export const UserService = {
  saveUserToFirestore,
  updateUserProfile,
  updateUserAvatar,
  getUserData,
  subscribeToUser,
};
