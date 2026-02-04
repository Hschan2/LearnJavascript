import { useState } from "react";
import { User } from "firebase/auth";
import { messages, formatMessage } from "../../message";
import {
  FollowerProps,
  FollowingProps,
  ITweet,
} from "../../features/tweet/types/tweet-type";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { dataBase } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { addFirestoreUnsubscribe } from "../../lib/firestoreSubscriptions";
import { deleteDocument, getDocuments, setDocument } from "../../services/databaseService";

function useFollow() {
  const [followDataUserById, setFollowDataUserById] = useState<boolean>(false);
  const [followingData, setFollowingData] = useState<FollowingProps[]>([]);
  const [followerData, setFollowerData] = useState<FollowerProps[]>([]);

  const handleFollow = async (tweet: ITweet, user: User) => {
    try {
      await setDocument(["follow", user.uid, "following", tweet.userId], {
        followingId: tweet.userId,
        followingName: tweet.username,
        followingPhoto: tweet.photo,
        isFollowing: true,
        createdAt: new Date().toISOString(),
      });
      await setDocument(["follow", tweet.userId, "followers", user.uid], {
        followerId: user.uid,
        followerName: user.displayName,
        followerPhoto: user.photoURL,
        createdAt: new Date().toISOString(),
      });

      await createNotification(tweet, user);
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedFollow, {
          errorMessage: (error as Error).message,
        })
      );
    }
  };

  const createNotification = async (tweet: ITweet, user: User) => {
    const notificationId = uuidv4();
    await setDocument(["notifications", notificationId], {
      id: notificationId,
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
      await deleteDocument(["follow", user.uid, "following", tweet.userId]);
      await deleteDocument(["follow", tweet.userId, "followers", user.uid]);
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedUnfollow, {
          errorMessage: (error as Error).message,
        })
      );
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
      console.error(
        formatMessage(messages.serviceError.failedFetchFollowingStatus, {
          errorMessage: (error as Error).message,
        })
      );
      setFollowDataUserById(false);
    }
  };

  const fetchFollowingData = async (userId: string | undefined) => {
    if (!userId) return;
    try {
      const followingSnapshot = await getDocuments([
        "follow",
        userId,
        "following",
      ]);
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
      console.error(
        formatMessage(messages.serviceError.failedFetchFollowingCount, {
          errorMessage: (error as Error).message,
        })
      );
    }
  };

  const fetchFollowerData = async (userId: string | undefined) => {
    if (!userId) return;
    try {
      const followerSnapshot = await getDocuments([
        "follow",
        userId,
        "followers",
      ]);
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
      console.error(
        formatMessage(messages.serviceError.failedFetchFollowerCount, {
          errorMessage: (error as Error).message,
        })
      );
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
