import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  increment,
  collection,
  setDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, dataBase, storage } from "../../../firebase";
import { IComment, IReply, ITweet } from "../types/tweet-type";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addFirestoreUnsubscribe } from "../../../lib/firestoreSubscriptions";
import {
  deleteDocument,
  getDocument,
  updateDocument,
} from "../../../services/databaseService";

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

    addFirestoreUnsubscribe(unsubscribe);

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
  async addComment(tweet: ITweet, comment: IComment) {
    try {
      await updateDocument(["tweets", tweet.id], {
        comments: arrayUnion(comment),
      });

      if (comment.commenterId !== tweet.userId) {
        await tweetService.createNotification(
          comment.commenterId,
          tweet,
          "comment"
        );
      }
    } catch (error) {
      console.error("댓글 작성 실패: ", error);
    }
  },

  async deleteComment(tweetId: string, comment: IComment) {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    try {
      await updateDocument(["tweets", tweetId], {
        comments: arrayRemove(comment),
      });
    } catch (error) {
      console.error("댓글 삭제 실패: ", error);
    }
  },

  async toggleCommentLike(tweetId: string, commentId: string, userId: string) {
    try {
      const tweetDoc = await getDocument(["tweets", tweetId]);
      if (!tweetDoc.exists()) {
        throw new Error("해당 게시글을 찾지 못했습니다.");
      }

      const tweetData = tweetDoc.data() as ITweet;
      const comments = tweetData.comments || [];
      const commentIndex = comments.findIndex((c) => c.commentId === commentId);

      if (commentIndex === -1) {
        throw new Error("댓글이 없습니다.");
      }

      const comment = comments[commentIndex];
      const likedBy = comment.likedBy || [];
      const isLiked = likedBy.includes(userId);
      const likeCount = comment.likeCount || 0;

      if (isLiked) {
        // 좋아요 취소
        comments[commentIndex] = {
          ...comment,
          likeCount: likeCount - 1,
          likedBy: likedBy.filter((id) => id !== userId),
        };
      } else {
        // 좋아요
        comments[commentIndex] = {
          ...comment,
          likeCount: likeCount + 1,
          likedBy: [...likedBy, userId],
        };
      }

      await updateDocument(["tweets", tweetId], { comments: comments });
    } catch (error) {
      console.error("댓글 좋아요 실패: ", error);
    }
  },

  async toggleLike(
    tweetId: string,
    userId: string,
    liked: boolean,
    tweet?: ITweet
  ) {
    const updateData = liked
      ? { likes: increment(-1), likedBy: arrayRemove(userId) }
      : { likes: increment(1), likedBy: arrayUnion(userId) };
    await updateDocument(["tweets", tweetId], updateData);

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
    const updateData = reported
      ? { exclamation: increment(-1), exclamationBy: arrayRemove(userId) }
      : { exclamation: increment(1), exclamationBy: arrayUnion(userId) };
    await updateDocument(["tweets", tweetId], updateData);

    const tweetDoc = await getDocument(["tweets", tweetId]);
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
      await deleteDocument(["tweets", tweetId]);
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
    await deleteDocument(["likedTweets", `${userId}_${tweetId}`]);
  },

  async createNotification(
    senderId: string,
    tweetObj: ITweet,
    type: "like" | "comment" | "other"
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

  getReplies(
    tweetId: string,
    commentId: string,
    callback: (replies: IReply[]) => void
  ) {
    const repliesRef = collection(dataBase, "tweets", tweetId, "replies");
    const q = query(
      repliesRef,
      where("commentId", "==", commentId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const replies = snapshot.docs.map((doc) => doc.data() as IReply);
      callback(replies);
    });

    return unsubscribe;
  },

  async addReply(tweetId: string, commentId: string, replyText: string) {
    if (!auth.currentUser) return;

    const replyId = uuidv4();
    const reply: IReply = {
      replyId,
      commentId,
      replyText,
      replierId: auth.currentUser.uid,
      replierName: auth.currentUser.displayName || "Anonymous",
      replierProfile: auth.currentUser.photoURL || "",
      createdAt: Date.now(),
    };

    const replyRef = doc(dataBase, "tweets", tweetId, "replies", replyId);
    try {
      await setDoc(replyRef, reply);
    } catch (error) {
      console.error("답변 추가 에러: ", error);
      return;
    }

    try {
      const tweetDoc = await getDocument(["tweets", tweetId]);
      if (!tweetDoc.exists()) return;

      const tweetData = tweetDoc.data() as ITweet;
      const comments = tweetData.comments || [];
      const commentIndex = comments.findIndex((c) => c.commentId === commentId);

      if (commentIndex > -1) {
        const currentReplyCount = comments[commentIndex].replyCount || 0;
        comments[commentIndex].replyCount = currentReplyCount + 1;
        await updateDocument(["tweets", tweetId], { comments });
      }
    } catch (error) {
      console.error("답변 개수 업데이트 에러: ", error);
    }
  },

  async deleteReply(tweetId: string, commentId: string, reply: IReply) {
    if (auth.currentUser?.uid !== reply.replierId) return;

    try {
      await deleteDocument(["tweets", tweetId, "replies", reply.replyId]);
    } catch (error) {
      console.error("답변 삭제 에러: ", error);
      return;
    }

    try {
      const tweetDoc = await getDocument(["tweets", tweetId]);
      if (!tweetDoc.exists()) return;

      const tweetData = tweetDoc.data() as ITweet;
      const comments = tweetData.comments || [];
      const commentIndex = comments.findIndex((c) => c.commentId === commentId);

      if (commentIndex > -1) {
        const currentReplyCount = comments[commentIndex].replyCount || 1;
        comments[commentIndex].replyCount = currentReplyCount - 1;
        await updateDocument(["tweets", tweetId], { comments });
      }
    } catch (error) {
      console.error("답변 개수 업데이트 에러: ", error);
    }
  },

  async toggleReplyLike(tweetId: string, replyId: string, userId: string) {
    try {
      const replyDoc = await getDocument([
        "tweets",
        tweetId,
        "replies",
        replyId,
      ]);
      if (!replyDoc.exists()) {
        throw new Error("해당 답변을 찾지 못했습니다.");
      }

      const replyData = replyDoc.data() as IReply;
      const likedBy = replyData.likedBy || [];
      const isLiked = likedBy.includes(userId);

      const updateData = isLiked
        ? { likes: increment(-1), likedBy: arrayRemove(userId) }
        : { likes: increment(1), likedBy: arrayUnion(userId) };

      await updateDocument(
        ["tweets", tweetId, "replies", replyId],
        updateData
      );
    } catch (error) {
      console.error("답변 좋아요 처리 실패: ", error);
    }
  },
};
