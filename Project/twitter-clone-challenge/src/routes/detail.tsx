import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  DetailTweetText,
  DetailImage,
  DetailProfileWrapper,
  DetailWrapper,
  ProfileImage,
  DetailContentWrapper,
  TagWrapper,
  Tag,
  DetailInfo,
  DetailCommentWrapper,
  DetailRetouch,
  CommentsWrapper,
  DetailTweetWrapper,
  DetailButtonWrapper,
  DetailTitleButton,
  DetailEventButtonWrapper,
} from "../components/style/tweet-components";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../firebase";
import formattedDate from "../hooks/formattedDate";
import { Avatar } from "../components/style/screen-components";
import {
  Form,
  SubmitButton,
  TextArea,
} from "../components/style/form-components";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "../components/types/tweet-type";
import { tweetService, useDetailTweet } from "../hooks/tweet/useTweet";
import LikeBtn from "../components/screen/detail/like-button";
import CommentList from "../components/screen/detail/comment-list";
import ExclamationBtn from "../components/screen/detail/exclamation-button";
import EventBtn from "../components/screen/detail/event-button";

function DetailTweet() {
  const { tweetId } = useParams();

  if (!tweetId) return <div>데이터를 불러올 수 없습니다.</div>;

  const {
    tweet,
    likes,
    likedByUser,
    exclamation,
    exclamationByUser,
    comments,
    setComments,
  } = useDetailTweet(tweetId);
  const [newComment, setNewComment] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const navigate = useNavigate();

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
        console.error("삭제 중 오류 F발생: ", error);
      }
    }
  };

  useEffect(() => {
    if (!tweet?.userId) return;

    const getProfileImage = async () => {
      const image = await tweetService.fetchProfileImage(tweet.userId);
      setProfileImage(image);
    };

    getProfileImage();
  }, [tweet?.userId]);

  return (
    <DetailWrapper>
      <DetailImage src={tweet?.photo} alt="Detail-Image" loading="lazy" />
      <DetailContentWrapper>
        <DetailTweetWrapper>
          <DetailTitleButton>
            <DetailTweetText>{tweet?.tweet}</DetailTweetText>
            {auth?.currentUser?.uid === tweet?.userId && (
              <DetailEventButtonWrapper>
                <EventBtn
                  use="update"
                  onClick={() => navigate(`/update/${tweetId}`)}
                />
                <EventBtn use="delete" onClick={handleDelete} />
              </DetailEventButtonWrapper>
            )}
          </DetailTitleButton>
          <DetailButtonWrapper>
            <LikeBtn
              likes={likes}
              likedByUser={likedByUser}
              onClick={handleToggleLike}
            />
            <ExclamationBtn
              exclamation={exclamation}
              onClick={handleToggleExclamation}
            />
          </DetailButtonWrapper>
        </DetailTweetWrapper>
        <DetailProfileWrapper>
          {profileImage && (
            <ProfileImage src={profileImage} alt="Profile-Image" />
          )}{" "}
          {tweet?.username}
        </DetailProfileWrapper>
        <TagWrapper>
          {tweet?.tags?.map((tag: string, index: number) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagWrapper>
        {tweet?.location && <DetailInfo>위치: {tweet.location}</DetailInfo>}
        <DetailInfo>업로드 날짜: {formattedDate(tweet?.createdAt)}</DetailInfo>
        <DetailInfo>카메라 브랜드: {tweet?.item}</DetailInfo>
        {tweet?.retouch && (
          <DetailRetouch href={tweet.retouch} download>
            보정 파일 다운로드
          </DetailRetouch>
        )}
      </DetailContentWrapper>
      <CommentsWrapper>
        {comments && (
          <CommentList comments={comments} onDelete={handleDeleteComment} />
        )}
      </CommentsWrapper>
      <DetailCommentWrapper>
        {auth.currentUser?.photoURL ? (
          <Avatar src={auth.currentUser?.photoURL} alt="Profile" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <Form
          className="comment"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddComment();
          }}
        >
          <TextArea
            ref={textareaRef}
            maxLength={150}
            onChange={(e) => {
              e.preventDefault();
              setNewComment(e.target.value);
            }}
            value={newComment}
            placeholder="상대방을 고려하여 댓글을 작성해 주세요."
            required
          />
          <SubmitButton type="submit" value="작성" />
        </Form>
      </DetailCommentWrapper>
    </DetailWrapper>
  );
}

export default DetailTweet;
