import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { auth, dataBase, storage } from "../../firebase";
import { IComment, ITweet } from "../../components/types/tweet-type";
import { deleteObject, ref } from "firebase/storage";

export function useDetailTweet(tweetId: string) {
  const [tweet, setTweet] = useState<ITweet | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [likedByUser, setLikedByUser] = useState<boolean>(false);
  const [exclamation, setExclamation] = useState<number>(0);
  const [exclamationByUser, setExclamationByUser] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (!tweetId) return;
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const unsubscribe = onSnapshot(tweetRef, (doc) => {
      const tweetData = doc.data() as ITweet | undefined;
      if (tweetData) {
        setTweet(tweetData);
        setLikes(tweetData.likes || 0);
        setLikedByUser(
          (auth.currentUser?.uid &&
            tweetData.likedBy?.includes(auth.currentUser.uid)) ||
            false
        );
        setExclamation(tweetData.exclamation || 0);
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
    likes,
    likedByUser,
    exclamation,
    exclamationByUser,
    comments,
    setLikes,
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

  async toggleLike(tweetId: string, userId: string, liked: boolean) {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const updateData = liked
      ? { likes: increment(-1), likedBy: arrayRemove(userId) }
      : { likes: increment(1), likedBy: arrayUnion(userId) };
    await updateDoc(tweetRef, updateData);
  },

  async toggleExclamation(
    tweetId: string,
    userId: string,
    exclamation: boolean
  ) {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const updateData = exclamation
      ? { exclamation: increment(-1), exclamationBy: arrayRemove(userId) }
      : { exclamation: increment(1), exclamationBy: arrayUnion(userId) };
    await updateDoc(tweetRef, updateData);
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
};
