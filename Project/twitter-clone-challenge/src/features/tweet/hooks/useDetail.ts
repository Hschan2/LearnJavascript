import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { tweetService } from "./useTweetAction";
import { IComment, ITweet } from "../types/tweet-type";
import { auth } from "../../../firebase";

export const useDetail = (
  tweetId: string,
  setComments: Dispatch<SetStateAction<IComment[]>>
) => {
  const [newComment, setNewComment] = useState<string>("");

  const addComment = async (tweet: ITweet) => {
    if (!newComment.trim()) return;
    const comment: IComment = {
      commentId: uuidv4(),
      commentText: newComment,
      commenterId: auth.currentUser?.uid || "unknown",
      commenterName: auth.currentUser?.displayName || "익명",
      commenterProfile: auth.currentUser?.photoURL || "",
      createdAt: Date.now(),
    };
    await tweetService.addComment(tweet, comment);
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
