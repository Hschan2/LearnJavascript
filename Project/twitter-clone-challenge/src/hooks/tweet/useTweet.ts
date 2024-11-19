import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ITweet } from "../../components/types/tweet-type";
import { auth, dataBase, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const useTweet = () => {
  const deleteTweet = async (
    tweetId: string,
    userId: string,
    photo?: string
  ): Promise<void> => {
    try {
      await deleteDoc(doc(dataBase, "tweets", tweetId));
      if (photo) {
        const photoRef = ref(storage, `tweets/${userId}/${tweetId}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      throw new Error(`트윗 삭제 실패: ${error}`);
    }
  };

  const toggleLike = async (
    tweetObj: ITweet,
    userId: string
  ): Promise<void> => {
    const tweetRef = doc(dataBase, "tweets", tweetObj.id);
    const tweetDoc = await getDoc(tweetRef);

    if (tweetDoc.exists()) {
      const { likes = 0, likedBy = [] } = tweetDoc.data();
      const alreadyLiked = likedBy.includes(userId);

      if (alreadyLiked) {
        await updateDoc(tweetRef, {
          likes: likes - 1,
          likedBy: likedBy.filter((uid: string) => uid !== userId),
        });
        await deletedLikedTweet(userId, tweetObj.id);
      } else {
        await updateDoc(tweetRef, {
          likes: likes + 1,
          likedBy: [...likedBy, userId],
        });
        await storeLikedTweet(userId, tweetObj);
        if (userId !== tweetObj.userId) {
          await createNotification(userId, tweetObj, "like");
        }
      }
    }
  };

  const toggleExclamation = async (
    tweetId: string,
    userId: string
  ): Promise<void> => {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const tweetDoc = await getDoc(tweetRef);

    if (tweetDoc.exists()) {
      const { exclamation = 0, exclamationBy = [] } = tweetDoc.data();
      const alreadyExclaimed = exclamationBy.includes(userId);

      if (!alreadyExclaimed) {
        await updateDoc(tweetRef, {
          exclamation: exclamation + 1,
          exclamationBy: [...exclamationBy, userId],
        });
      }

      if (exclamation >= 5) {
        await deleteTweet(tweetId, userId);
      }
    }
  };

  const fetchProfileImage = async (userId: string): Promise<string> => {
    try {
      const imageRef = ref(storage, `avatars/${userId}`);
      return await getDownloadURL(imageRef);
    } catch {
      return "";
    }
  };

  const storeLikedTweet = async (userId: string, tweetObj: ITweet) => {
    const likedTweetRef = doc(collection(dataBase, "likedTweets"));
    await setDoc(likedTweetRef, {
      userId,
      tweetId: tweetObj.id,
      likedAt: new Date().toISOString(),
    });
  };

  const deletedLikedTweet = async (userId: string, tweetId: string) => {
    const likedTweetQuery = doc(
      dataBase,
      "likedTweets",
      `${userId}_${tweetId}`
    );
    await deleteDoc(likedTweetQuery);
  };

  const createNotification = async (
    senderId: string,
    tweetObj: ITweet,
    type: "like" | "other"
  ) => {
    const notificationRef = doc(dataBase, "notifications", uuidv4());
    await setDoc(notificationRef, {
      id: notificationRef.id,
      recipientId: tweetObj.userId,
      tweetTitle: tweetObj.tweet,
      tweetId: tweetObj.id,
      senderId,
      senderName: auth.currentUser?.displayName || "익명",
      createdAt: new Date().toISOString(),
      type,
      isRead: false,
    });
  };

  return { deleteTweet, toggleLike, toggleExclamation, fetchProfileImage };
};
