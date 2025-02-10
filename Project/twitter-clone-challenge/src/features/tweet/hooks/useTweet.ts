import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  increment,
  collection,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, dataBase, storage } from "../../../firebase";
import { IComment, ITweet } from "../../../components/types/tweet-type";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export function useDetailTweet(tweetId: string) {
  const [tweet, setTweet] = useState<ITweet | null>(null);
  const [likedByUser, setLikedByUser] = useState<boolean>(false);
  const [exclamationByUser, setExclamationByUser] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (!tweetId) return;
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const unsubscribe = onSnapshot(tweetRef, (doc) => {
      const tweetData = { ...doc.data(), id: doc.id } as ITweet | undefined;
      if (tweetData) {
        setTweet(tweetData);
        setLikedByUser(
          (auth.currentUser?.uid &&
            tweetData.likedBy?.includes(auth.currentUser.uid)) ||
            false
        );
        setExclamationByUser(
          (auth.currentUser?.uid &&
            tweetData.exclamationBy?.includes(auth.currentUser.uid)) ||
            false
        );
        setComments(tweetData.comments || []);
      }
    });

    return () => unsubscribe();
  }, [tweetId]);

  return {
    tweet,
    likedByUser,
    exclamationByUser,
    comments,
    setComments,
  };
}

export const tweetService = {
  async addComment(tweetId: string, comment: IComment) {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    try {
      await updateDoc(tweetRef, {
        comments: arrayUnion(comment),
      });
    } catch (error) {
      console.error("댓글 작성 실패: ", error);
    }
  },

  async deleteComment(tweetId: string, comment: IComment) {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    try {
      await updateDoc(tweetRef, {
        comments: arrayRemove(comment),
      });
    } catch (error) {
      console.error("댓글 삭제 실패: ", error);
    }
  },

  async toggleLike(
    tweetId: string,
    userId: string,
    liked: boolean,
    tweet?: ITweet
  ) {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const updateData = liked
      ? { likes: increment(-1), likedBy: arrayRemove(userId) }
      : { likes: increment(1), likedBy: arrayUnion(userId) };
    await updateDoc(tweetRef, updateData);

    if (liked) {
      await tweetService.deletedLikedTweet(userId, tweetId);
    } else {
      if (tweet) {
        await tweetService.storeLikedTweet(userId, tweet);

        if (userId !== tweet.userId)
          await tweetService.createNotification(userId, tweet, "like");
      }
    }
  },

  async toggleExclamation(tweetId: string, userId: string, reported: boolean) {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const updateData = reported
      ? { exclamation: increment(-1), exclamationBy: arrayRemove(userId) }
      : { exclamation: increment(1), exclamationBy: arrayUnion(userId) };
    await updateDoc(tweetRef, updateData);

    const tweetDoc = await getDoc(tweetRef);
    if (tweetDoc.exists()) {
      const { exclamation = 0, photo } = tweetDoc.data();
      if (exclamation >= 7)
        await tweetService.deleteTweet(tweetId, userId, photo);
    }
  },

  async deleteTweet(
    tweetId: string,
    userId: string | undefined,
    photo?: string
  ) {
    if (!auth.currentUser) {
      throw new Error("사용자가 인증되지 않았습니다.");
    }

    if (auth.currentUser.uid !== userId) {
      console.log(auth.currentUser.uid, "/", userId);
      throw new Error("사용자가 이 파일을 삭제할 권한이 없습니다.");
    }

    try {
      await deleteDoc(doc(dataBase, "tweets", tweetId));
      if (photo) {
        const photoRef = ref(storage, `tweets/${userId}/${tweetId}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      throw new Error(`트윗 삭제 실패: ${error}`);
    }
  },

  async storeLikedTweet(userId: string, tweetObj: ITweet) {
    const likedTweetRef = doc(collection(dataBase, "likedTweets"));
    await setDoc(likedTweetRef, {
      userId,
      tweetId: tweetObj.id,
      likedAt: new Date().toISOString(),
    });
  },

  async deletedLikedTweet(userId: string, tweetId: string) {
    const likedTweetQuery = doc(
      dataBase,
      "likedTweets",
      `${userId}_${tweetId}`
    );
    await deleteDoc(likedTweetQuery);
  },

  async createNotification(
    senderId: string,
    tweetObj: ITweet,
    type: "like" | "other"
  ) {
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
  },

  async fetchProfileImage(userId: string): Promise<string> {
    try {
      const imageRef = ref(storage, `avatars/${userId}`);
      return await getDownloadURL(imageRef);
    } catch {
      return "";
    }
  },
};
