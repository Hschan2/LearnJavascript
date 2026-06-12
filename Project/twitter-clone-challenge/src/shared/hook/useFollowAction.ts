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
import { followingConverter, followerConverter, notificationConverter } from "../../lib/converters";
import { NotificationType } from "../../features/notification/types/notifications";

function useFollow() {
  const [followDataUserById, setFollowDataUserById] = useState<boolean>(false);
  const [followingData, setFollowingData] = useState<FollowingProps[]>([]);
  const [followerData, setFollowerData] = useState<FollowerProps[]>([]);

  const handleFollow = async (tweet: ITweet, user: User) => {
    try {
      await setDocument<FollowingProps>(
        ["follow", user.uid, "following", tweet.userId],
        {
          id: tweet.userId,
          followingId: tweet.userId,
          followingName: tweet.username,
          followingPhoto: tweet.photo || "",
          isFollowing: true,
          createdAt: Date.now(),
        },
        followingConverter
      );
      await setDocument<FollowerProps>(
        ["follow", tweet.userId, "followers", user.uid],
        {
          id: user.uid,
          followerId: user.uid,
          followerName: user.displayName || "익명",
          followerPhoto: user.photoURL || "",
          createdAt: Date.now(),
        },
        followerConverter
      );

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
    await setDocument<NotificationType>(
      ["notifications", notificationId],
      {
        id: notificationId,
        recipientId: tweet.userId,
        tweetTitle: tweet.tweet,
        tweetId: tweet.id,
        senderId: user.uid,
        senderName: user.displayName || "익명",
        createdAt: new Date().toISOString(),
        type: "follow",
        isRead: false,
      },
      notificationConverter
    );
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
      const followingSnapshot = await getDocuments<FollowingProps>(
        ["follow", userId, "following"],
        followingConverter
      );
      const followingList: FollowingProps[] = followingSnapshot.docs.map(
        (doc) => doc.data()
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
      const followerSnapshot = await getDocuments<FollowerProps>(
        ["follow", userId, "followers"],
        followerConverter
      );
      const followerList: FollowerProps[] = followerSnapshot.docs.map((doc) => doc.data());
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
