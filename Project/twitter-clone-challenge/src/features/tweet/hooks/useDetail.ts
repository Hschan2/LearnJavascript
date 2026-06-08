import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { tweetService } from "./useTweetAction";
import { IComment, ITweet } from "../types/tweet-type";
import { auth } from "../../../firebase";

import { messages, formatMessage } from "../../../message";
import { filterBadWords } from "../../../shared/filter-bad-words";

export const useDetail = (
  tweetId: string,
  setComments: Dispatch<SetStateAction<IComment[]>>
) => {
  const [newComment, _setNewComment] = useState<string>("");

  const setNewComment = (value: string) => {
    _setNewComment(value);
  };

  const applyFilter = () => {
    _setNewComment(filterBadWords(newComment));
  };

  const addComment = async (tweet: ITweet) => {
    const filteredComment = filterBadWords(newComment.trim());
    if (!filteredComment) return;

    const comment: IComment = {
      commentId: uuidv4(),
      commentText: filteredComment,
      commenterId: auth.currentUser?.uid || "unknown",
      commenterName: auth.currentUser?.displayName || "익명",
      commenterProfile: auth.currentUser?.photoURL || "",
      createdAt: Date.now(),
      likeCount: 0,
      likedBy: [],
    };
    await tweetService.addComment(tweet, comment);
    setNewComment("");
  };

  const deleteComment = async (comment: IComment) => {
    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) return;
    await tweetService.deleteComment(tweetId, comment);
    setComments((prev: IComment[]) =>
      prev.filter((c) => c.commentId !== comment.commentId)
    );
  };

  const updateComment = async (commentId: string, newText: string) => {
    const filteredText = filterBadWords(newText.trim());
    if (!filteredText) return;

    try {
      await tweetService.updateComment(tweetId, commentId, filteredText);
      setComments((prev: IComment[]) =>
        prev.map((c) =>
          c.commentId === commentId ? { ...c, commentText: filteredText } : c
        )
      );
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedUpdateComment, {
          errorMessage: (error as Error).message,
        })
      );
    }
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

  const toggleCommentLike = async (comment: IComment) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    const isLiked = comment.likedBy?.includes(userId);

    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.commentId === comment.commentId) {
          const likeCount = c.likeCount || 0;
          const likedBy = c.likedBy || [];
          return {
            ...c,
            likeCount: isLiked ? likeCount - 1 : likeCount + 1,
            likedBy: isLiked
              ? likedBy.filter((id) => id !== userId)
              : [...likedBy, userId],
          };
        }
        return c;
      })
    );

    await tweetService.toggleCommentLike(tweetId, comment.commentId, userId);
  };

  return {
    newComment,
    setNewComment,
    applyFilter,
    addComment,
    deleteComment,
    updateComment,
    toggleLike,
    toggleExclamation,
    toggleCommentLike,
  };
};
