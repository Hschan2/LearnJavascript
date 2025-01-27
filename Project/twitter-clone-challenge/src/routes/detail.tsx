import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, dataBase } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { IComment, ITweet } from "../components/types/tweet-type";
import { tweetService, useDetailTweet } from "../hooks/tweet/useTweet";
import DetailUI from "./components/DetailUI";
import { User } from "firebase/auth";
import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

function DetailTweet() {
  const { tweetId } = useParams();
  const navigate = useNavigate();

  if (!tweetId) return <div>데이터를 불러올 수 없습니다.</div>;

  const { tweet, likedByUser, exclamationByUser, comments, setComments } =
    useDetailTweet(tweetId);
  const [newComment, setNewComment] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [followDataUserById, setFollowDataUserById] = useState<boolean>(false);

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

  const handleFollow = async (tweet: ITweet, user: User) => {
    await setDoc(
      doc(dataBase, `follow/${user.uid}/following/${tweet.userId}`),
      {
        followingName: tweet.username,
        followingPhoto: tweet.photo,
        isFollowing: true,
        createdAt: new Date().toISOString(),
      }
    );
    await setDoc(
      doc(dataBase, `follow/${tweet.userId}/followers/${user.uid}`),
      {
        followerName: user.displayName,
        followerPhoto: user.photoURL,
        createdAt: new Date().toISOString(),
      }
    );
  };

  const handleUnFollow = async (tweet: ITweet, user: User) => {
    await deleteDoc(
      doc(dataBase, `follow/${user.uid}/following/${tweet.userId}`)
    );
    await deleteDoc(
      doc(dataBase, `follow/${tweet.userId}/followers/${user.uid}`)
    );
  };

  const fetchFollowingUserById = (
    userId: string | undefined,
    followingUserId: string
  ) => {
    if (!userId || !followingUserId) return;

    try {
      const followingDocRef = doc(
        dataBase,
        `follow/${userId}/following`,
        followingUserId
      );

      const unsubscribe = onSnapshot(followingDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const { isFollowing } = docSnapshot.data();
          setFollowDataUserById(!!isFollowing);
        } else {
          setFollowDataUserById(false);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error(error);
      setFollowDataUserById(false);
    }
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
