import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { auth } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "../../components/types/tweet-type";
import { tweetService, useDetailTweet } from "./hooks/useTweet";
import DetailUI from "./components/DetailUI";
import useFollow from "../user/hooks/useFollow";

function DetailTweet() {
  const { tweetId } = useParams();
  const navigate = useNavigate();

  if (!tweetId) return <div>데이터를 불러올 수 없습니다.</div>;

  const { tweet, likedByUser, exclamationByUser, comments, setComments } =
    useDetailTweet(tweetId);
  const {
    followDataUserById,
    handleFollow,
    handleUnFollow,
    fetchFollowingUserById,
  } = useFollow();
  const [newComment, setNewComment] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");

  const handleAddComment = async () => {
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

  const handleDeleteComment = async (comment: IComment) => {
    await tweetService.deleteComment(tweetId, comment);
    setComments((prev) =>
      prev.filter((c) => c.commentId !== comment.commentId)
    );
  };

  const handleToggleExclamation = async () => {
    await tweetService.toggleExclamation(
      tweetId,
      auth.currentUser?.uid || "",
      exclamationByUser
    );
  };

  const handleToggleLike = async () => {
    if (!tweet) return;
    await tweetService.toggleLike(
      tweetId,
      auth.currentUser?.uid || "",
      likedByUser,
      tweet
    );
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await tweetService.deleteTweet(tweetId, tweet?.userId, tweet?.photo);
        navigate("/");
      } catch (error) {
        console.error("삭제 중 오류 발생: ", error);
      }
    }
  };

  const handleTagClick = (tag: string) => {
    navigate(`/search?tag=${encodeURIComponent(tag)}`);
  };

  const handleURLCopy = async () => {
    try {
      const currentURL = window.location.href;
      await navigator.clipboard.writeText(currentURL);
      alert("URL 복사가 완료되었습니다.");
    } catch (error) {
      console.error("URL 복사 실패");
    }
  };

  const moveUserTweetListPage = () => {
    navigate(`/user-tweets/${tweet?.userId}`);
  };

  useEffect(() => {
    if (!tweet?.userId) return;
    tweetService.fetchProfileImage(tweet.userId).then(setProfileImage);
    const unsubscribe = fetchFollowingUserById(
      auth.currentUser?.uid,
      tweet.userId
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [tweet?.userId]);

  return (
    <DetailUI
      tweet={{ tweet: tweet, likedByUser: likedByUser }}
      user={{
        uid: auth.currentUser?.uid || null,
        photoURL: auth.currentUser?.photoURL || null,
        displayName: auth.currentUser?.displayName || null,
        isFollowing: followDataUserById,
      }}
      actions={{
        onLike: handleToggleLike,
        onExclamation: handleToggleExclamation,
        onDeleteComment: handleDeleteComment,
        onNavigateUpdate: () => navigate(`/update/${tweetId}`),
        onDeleteTweet: handleDelete,
        onAddComment: handleAddComment,
        onTagClick: handleTagClick,
        onURLCopy: handleURLCopy,
        onFollow: handleFollow,
        onUnFollow: handleUnFollow,
        onMoveUserList: moveUserTweetListPage,
      }}
      commentsData={{
        comments,
        newComment,
        setNewComment,
      }}
      profileImage={profileImage}
      textareaRef={textareaRef}
    />
  );
}

export default DetailTweet;
