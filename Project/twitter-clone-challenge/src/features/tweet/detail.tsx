import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { auth } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "./types/tweet-type";
import { tweetService, useDetailTweet } from "./hooks/useTweetAction";
import DetailUI from "./components/detail-ui";
import useFollow from "../../shared/hook/useFollowAction";
import { useDetail } from "./hooks/useDetail";

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
  const {
    newComment,
    setNewComment,
    addComment,
    deleteComment,
    toggleLike,
    toggleExclamation,
  } = useDetail(tweetId, setComments);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");

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
      tweet={{
        tweet: tweet,
        likedByUser: likedByUser,
        exclamationByUser: exclamationByUser,
      }}
      user={{
        uid: auth.currentUser?.uid || null,
        photoURL: auth.currentUser?.photoURL || null,
        displayName: auth.currentUser?.displayName || null,
        isFollowing: followDataUserById,
      }}
      actions={{
        onLike: toggleLike,
        onExclamation: toggleExclamation,
        onDeleteComment: deleteComment,
        onNavigateUpdate: () => navigate(`/update/${tweetId}`),
        onDeleteTweet: handleDelete,
        onAddComment: addComment,
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
