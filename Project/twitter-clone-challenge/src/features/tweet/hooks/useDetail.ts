import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { tweetService } from "./useTweet";
import { IComment, ITweet } from "../../../components/types/tweet-type";
import { auth } from "../../../firebase";

export const useDetail = (tweetId: string, setComments: Function) => {
  const [newComment, setNewComment] = useState<string>("");

  const addComment = async () => {
    if (!newComment.trim()) return;

    const comment = {
      commentId: uuidv4(),
      commentText: newComment,
      commenterId: auth.currentUser?.uid || "unknown",
      commenterName: auth.currentUser?.displayName || "익명",
      commenterProfile: auth.currentUser?.photoURL || "",
      createdAt: Date.now(),
    };

    await tweetService.addComment(tweetId, comment);
    setNewComment("");
  };

  const deleteComment = async (comment: IComment) => {
    await tweetService.deleteComment(tweetId, comment);
    setComments((prev: IComment[]) =>
      prev.filter((c) => c.commentId !== comment.commentId)
    );
  };

  const toggleLike = async (likedByUser: boolean, tweet: ITweet) => {
    if (!tweet) return;

    await tweetService.toggleLike(
      tweetId,
      auth.currentUser?.uid || "",
      likedByUser,
      tweet
    );
  };

  const toggleExclamation = async (exclamationByUser: boolean) => {
    await tweetService.toggleExclamation(
      tweetId,
      auth.currentUser?.uid || "",
      exclamationByUser
    );
  };

  return {
    newComment,
    setNewComment,
    addComment,
    deleteComment,
    toggleLike,
    toggleExclamation,
  };
};
