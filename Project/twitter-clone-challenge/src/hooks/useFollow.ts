import { User } from "firebase/auth";
import { ITweet } from "../components/types/tweet-type";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { dataBase } from "../firebase";
import { useState } from "react";

function useFollow() {
  const [followDataUserById, setFollowDataUserById] = useState<boolean>(false);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);

  const handleFollow = async (tweet: ITweet, user: User) => {
    try {
      await setDoc(
        doc(dataBase, `follow/${user.uid}/following/${tweet.userId}`),
        {
          followingName: tweet.username,
          followingPhoto: tweet.photo,
          isFollowing: true,
          createdAt: new Date().toISOString(),
        }
      );
      await setDoc(
        doc(dataBase, `follow/${tweet.userId}/followers/${user.uid}`),
        {
          followerName: user.displayName,
          followerPhoto: user.photoURL,
          createdAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error("팔로우 실패: ", error);
    }
  };

  const handleUnFollow = async (tweet: ITweet, user: User) => {
    try {
      await deleteDoc(
        doc(dataBase, `follow/${user.uid}/following/${tweet.userId}`)
      );
      await deleteDoc(
        doc(dataBase, `follow/${tweet.userId}/followers/${user.uid}`)
      );
    } catch (error) {
      console.error("팔로워 저장 실패: ", error);
    }
  };

  const fetchFollowingUserById = (
    userId: string | undefined,
    followingUserId: string
  ) => {
    if (!userId || !followingUserId) return;

    try {
      const followingDocRef = doc(
        dataBase,
        `follow/${userId}/following`,
        followingUserId
      );

      const unsubscribe = onSnapshot(followingDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const { isFollowing } = docSnapshot.data();
          setFollowDataUserById(!!isFollowing);
        } else {
          setFollowDataUserById(false);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("팔로잉 여부 확인 실패: ", error);
      setFollowDataUserById(false);
    }
  };

  const fetchFollowingCount = async (userId: string | undefined) => {
    try {
      const followingSnapshot = await getDocs(
        collection(dataBase, `follow/${userId}/following`)
      );
      setFollowingCount(followingSnapshot.size);
    } catch (error) {
      console.error("팔로잉 수 가져오기 실패: ", error);
    }
  };

  const fetchFollowerCount = async (userId: string | undefined) => {
    try {
      const followerSnapshot = await getDocs(
        collection(dataBase, `follow/${userId}/followers`)
      );
      setFollowerCount(followerSnapshot.size);
    } catch (error) {
      console.error("팔로잉 수 가져오기 실패: ", error);
    }
  };

  return {
    followDataUserById,
    followingCount,
    followerCount,
    handleFollow,
    handleUnFollow,
    fetchFollowingUserById,
    fetchFollowingCount,
    fetchFollowerCount,
  };
}

export default useFollow;
