import { useState } from "react";
import { User } from "firebase/auth";
import {
  FollowerProps,
  FollowingProps,
  ITweet,
} from "../../features/tweet/types/tweet-type";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { dataBase } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { addFirestoreUnsubscribe } from "../../lib/firestoreSubscriptions";

function useFollow() {
  const [followDataUserById, setFollowDataUserById] = useState<boolean>(false);
  const [followingData, setFollowingData] = useState<FollowingProps[]>([]);
  const [followerData, setFollowerData] = useState<FollowerProps[]>([]);

  const handleFollow = async (tweet: ITweet, user: User) => {
    try {
      await setDoc(
        doc(dataBase, `follow/${user.uid}/following/${tweet.userId}`),
        {
          followingId: tweet.userId,
          followingName: tweet.username,
          followingPhoto: tweet.photo,
          isFollowing: true,
          createdAt: new Date().toISOString(),
        }
      );
      await setDoc(
        doc(dataBase, `follow/${tweet.userId}/followers/${user.uid}`),
        {
          followerId: user.uid,
          followerName: user.displayName,
          followerPhoto: user.photoURL,
          createdAt: new Date().toISOString(),
        }
      );

      await createNotification(tweet, user);
    } catch (error) {
      console.error("팔로우 실패: ", error);
    }
  };

  const createNotification = async (tweet: ITweet, user: User) => {
    const notificationRef = doc(dataBase, "notifications", uuidv4());
    await setDoc(notificationRef, {
      id: notificationRef.id,
      recipientId: tweet.userId,
      tweetTitle: tweet.tweet,
      tweetId: tweet.id,
      senderId: user.uid,
      senderName: user.displayName || "익명",
      createdAt: new Date().toISOString(),
      type: "follow",
      isRead: false,
    });
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

      const unsubscribe: () => void = onSnapshot(
        followingDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const { isFollowing } = docSnapshot.data();
            setFollowDataUserById(!!isFollowing);
          } else {
            setFollowDataUserById(false);
          }
        }
      );

      addFirestoreUnsubscribe(unsubscribe);

      return unsubscribe;
    } catch (error) {
      console.error("팔로잉 여부 확인 실패: ", error);
      setFollowDataUserById(false);
    }
  };

  const fetchFollowingData = async (userId: string | undefined) => {
    if (!userId) return;
    try {
      const followingSnapshot = await getDocs(
        collection(dataBase, `follow/${userId}/following`)
      );
      const followingList: FollowingProps[] = followingSnapshot.docs.map(
        (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            followingId: data.followingId || "",
            followingName: data.followingName || "",
            followingPhoto: data.followingPhoto || "",
            isFollowing: data.isFollowing ?? false,
            createdAt: data.createdAt || Date.now(),
          };
        }
      );
      setFollowingData(followingList);
    } catch (error) {
      console.error("팔로잉 수 가져오기 실패: ", error);
    }
  };

  const fetchFollowerData = async (userId: string | undefined) => {
    if (!userId) return;
    try {
      const followerSnapshot = await getDocs(
        collection(dataBase, `follow/${userId}/followers`)
      );
      const followerList: FollowerProps[] = followerSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          followerId: data.followerId || "",
          followerName: data.followerName || "",
          followerPhoto: data.followerPhoto || "",
          createdAt: data.createdAt || Date.now(),
        };
      });
      setFollowerData(followerList);
    } catch (error) {
      console.error("팔로잉 수 가져오기 실패: ", error);
    }
  };

  return {
    followDataUserById,
    followingData,
    followerData,
    handleFollow,
    handleUnFollow,
    fetchFollowingUserById,
    fetchFollowingData,
    fetchFollowerData,
  };
}

export default useFollow;
