import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
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
  CommentContainer,
  CommentProfile,
  CommentContent,
  CommentText,
  CommentCreatedTime,
  CommentDeleteButton,
  CommentProfileWrapper,
} from "../components/style/tweet-components";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, dataBase, storage } from "../firebase";
import formattedDate from "../hooks/formattedDate";
import { Avatar } from "../components/style/screen-components";
import {
  Form,
  SubmitButton,
  TextArea,
} from "../components/style/form-components";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "../components/types/tweet-type";

function DetailTweet() {
  const [profileImage, setProfileImage] = useState<string>("");
  const location = useLocation();
  const tweet = location.state?.tweetObj;
  const createdAt = tweet?.createdAt;
  const createdDate = formattedDate(createdAt);
  const avatar = auth.currentUser?.photoURL;
  const [comment, setComment] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const uuid = uuidv4();

  if (!tweet) return <div>데이터를 불러올 수 없습니다.</div>;

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.rows = 1;
      textareaRef.current.rows = textareaRef.current.scrollHeight / 20;
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    adjustTextareaHeight();
  };

  const addCommentToTweet = async (tweetId: string, comment: string) => {
    const tweetRef = doc(dataBase, "tweets", tweetId);
    const newComment = {
      commentId: uuid,
      commentText: comment,
      commenterId: auth.currentUser?.uid,
      commenterName: auth.currentUser?.displayName,
      commenterProfile: auth.currentUser?.photoURL,
      createdAt: Date.now(),
    };

    try {
      await updateDoc(tweetRef, {
        comments: arrayUnion(newComment),
      });
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addCommentToTweet(tweet.id, comment);
    setComment("");
  };

  const deleteComment = async (tweetId: string, commentId: string) => {
    if (!tweetId || !commentId) return;

    const deleteConfirm = confirm("댓글을 삭제할까요?");
    if (deleteConfirm) {
      try {
        const tweetRef = doc(dataBase, "tweets", tweetId);
        const tweetDoc = await getDoc(tweetRef);
        const tweetData = tweetDoc.data();
        if (!tweetData) {
          console.error("Tweet 데이터가 없습니다.");
          return;
        }
        const commentToDelete = tweetData.comments.find(
          (comment: IComment) => comment.commentId === commentId
        );
        if (!commentToDelete) {
          console.error("댓글 데이터가 없습니다.");
          return;
        }
        await updateDoc(tweetRef, {
          comments: arrayRemove(commentToDelete),
        });
      } catch (error) {
        console.error("댓글 삭제를 실패하였습니다.", error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const getProfileImage = async () => {
      const imageRef = ref(storage, `avatars/${tweet.userId}`);

      try {
        const url = await getDownloadURL(imageRef);
        setProfileImage(url);
      } catch (error) {
        console.error(error);
        setProfileImage("");
      }
    };

    getProfileImage();
  }, [tweet, tweet.userId]);

  return (
    <DetailWrapper>
      <DetailImage src={tweet.photo} alt="Detail-Image" loading="lazy" />
      <DetailContentWrapper>
        <DetailTweetText>{tweet.tweet}</DetailTweetText>
        <DetailProfileWrapper>
          {profileImage && (
            <ProfileImage src={profileImage} alt="Profile-Image" />
          )}{" "}
          {tweet.username}
        </DetailProfileWrapper>
        <TagWrapper>
          {tweet?.tags?.map((tag: string, index: number) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagWrapper>
        <DetailInfo>업로드 날짜: {createdDate}</DetailInfo>
        <DetailInfo>카메라 브랜드: {tweet.item}</DetailInfo>
        {tweet.retouch && (
          <DetailRetouch href={tweet.retouch} download>
            보정 파일 다운로드
          </DetailRetouch>
        )}
      </DetailContentWrapper>
      <DetailCommentWrapper>
        {avatar ? (
          <Avatar src={avatar} alt="Profile" />
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
        <Form className="comment" onSubmit={handleCommentSubmit}>
          <TextArea
            ref={textareaRef}
            maxLength={150}
            onChange={onTextChange}
            value={comment}
            placeholder="상대방을 고려하여 댓글을 작성해 주세요."
            required
          />
          <SubmitButton type="submit" value="작성" />
        </Form>
      </DetailCommentWrapper>
      <CommentsWrapper>
        {tweet.comments &&
          tweet.comments.map((comment: IComment) => (
            <CommentContainer>
              <CommentProfileWrapper>
                <CommentProfile>
                  <Avatar src={comment.commenterProfile} alt="Profile" />
                  <span>{comment.commenterName}</span>
                </CommentProfile>
                {comment.commenterId === auth.currentUser?.uid && (
                  <CommentDeleteButton
                    onClick={() => deleteComment(tweet.id, comment.commentId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </CommentDeleteButton>
                )}
              </CommentProfileWrapper>
              <CommentContent>
                <CommentText>{comment.commentText}</CommentText>
                <CommentCreatedTime>
                  {formattedDate(comment.createdAt)}
                </CommentCreatedTime>
              </CommentContent>
            </CommentContainer>
          ))}
      </CommentsWrapper>
    </DetailWrapper>
  );
}

export default DetailTweet;
