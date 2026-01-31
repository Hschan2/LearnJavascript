import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { auth } from "../../firebase";
import { tweetService, useDetailTweet } from "./hooks/useTweetAction";
import DetailUI from "./components/detail-ui";
import useFollow from "../../shared/hook/useFollowAction";
import { useDetail } from "./hooks/useDetail";
import ShareModal from "./components/share-modal";
import { SERVICE_ERROR_MESSAGE, SERVICE_MESSAGE } from "../../message";

function DetailTweetContent({ tweetId }: { tweetId: string }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
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
    toggleCommentLike,
  } = useDetail(tweetId, setComments);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");

  const handleDelete = async () => {
    if (window.confirm(SERVICE_MESSAGE.CHECK_DELETE_TWEET)) {
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
      alert(SERVICE_MESSAGE.SUCCESS_URL_COPY);
    } catch (error) {
      console.error(SERVICE_ERROR_MESSAGE.FAILED_URL_COPY);
    }
  };

  const moveUserTweetListPage = () => {
    navigate(`/user-tweets/${tweet?.userId}`);
  };

  const handleAddComment = () => {
    if (!tweet) return;
    addComment(tweet);
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
    <>
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
          onCommentLike: toggleCommentLike,
          onDeleteComment: deleteComment,
          onNavigateUpdate: () => navigate(`/update/${tweetId}`),
          onDeleteTweet: handleDelete,
          onAddComment: handleAddComment,
          onTagClick: handleTagClick,
          onURLCopy: handleURLCopy,
          onFollow: handleFollow,
          onUnFollow: handleUnFollow,
          onMoveUserList: moveUserTweetListPage,
          onShareClick: () => setIsShareModalOpen(true),
        }}
        commentsData={{
          comments,
          newComment,
          setNewComment,
        }}
        profileImage={profileImage}
        textareaRef={textareaRef}
      />
      <ShareModal
        open={isShareModalOpen}
        setOpen={setIsShareModalOpen}
        title={tweet?.tweet}
        image={tweet?.photo}
      />
    </>
  );
}

function DetailTweet() {
  const { tweetId } = useParams();

  if (!tweetId) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return <DetailTweetContent tweetId={tweetId} />;
}

export default DetailTweet;
