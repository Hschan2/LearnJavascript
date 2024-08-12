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
  DetailTweetWrapper,
  LikeButton,
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
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { IComment } from "../components/types/tweet-type";
import useNotificationStore from "../components/store/useNotification";

function DetailTweet() {
  const [profileImage, setProfileImage] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);
  const location = useLocation();
  const tweet = location.state?.tweetObj;
  const createdAt = tweet?.createdAt;
  const createdDate = formattedDate(createdAt);
  const avatar = auth.currentUser?.photoURL;
  const [comment, setComment] = useState<string>("");
  const [likes, setLikes] = useState<number>(tweet.likes || 0);
  const [likedByUser, setLikedByUser] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const commentId = uuidv4();
  const likedId = uuidv4();
  const commentedId = uuidv4();
  const user = auth.currentUser;

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
      commentId: commentId,
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
      if (user?.uid !== tweet.userId) {
        const notificationRef = doc(dataBase, "notifications", commentedId);
        await setDoc(notificationRef, {
          id: commentedId,
          recipientId: tweet.userId,
          tweetTitle: tweet.tweet,
          tweetId: tweet.id,
          senderId: user?.uid,
          senderName: user?.displayName || "익명",
          createdAt: new Date().toISOString(),
          type: "comment",
          isRead: false,
        });
      }
      useNotificationStore.getState().setNotification(true);
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

  const toggleLike = async () => {
    if (!user || !tweet.id) return;

    try {
      const tweetRef = doc(dataBase, "tweets", tweet.id);
      const tweetDoc = await getDoc(tweetRef);

      if (tweetDoc.exists()) {
        const currentLikes = tweetDoc.data()?.likes || 0;
        const likedBy = tweetDoc.data()?.likedBy || [];
        const userAlreadyLiked = likedBy.includes(user?.uid);

        if (userAlreadyLiked && currentLikes > 0) {
          await updateDoc(tweetRef, {
            likes: currentLikes - 1,
            likedBy: likedBy.filter((uid: string) => uid !== user?.uid),
          });
          const likedTweetQuery = query(
            collection(dataBase, "likedTweets"),
            where("userId", "==", user.uid),
            where("tweetId", "==", tweet.id)
          );
          const likedTweetSnapshot = await getDocs(likedTweetQuery);
          likedTweetSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
        if (!userAlreadyLiked) {
          await updateDoc(tweetRef, {
            likes: currentLikes + 1,
            likedBy: [...likedBy, user?.uid],
          });
          await setDoc(doc(collection(dataBase, "likedTweets")), {
            userId: user.uid,
            tweetId: tweet.id,
            likedAt: new Date().toISOString(),
          });
          if (user?.uid !== tweet.userId) {
            const notificationRef = doc(dataBase, "notifications", likedId);
            await setDoc(notificationRef, {
              id: likedId,
              recipientId: tweet.userId,
              tweetTitle: tweet.tweet,
              tweetId: tweet.id,
              senderId: user.uid,
              senderName: user.displayName || "익명",
              createdAt: new Date().toISOString(),
              type: "like",
              isRead: false,
            });
          }
        }
      }
      useNotificationStore.getState().setNotification(true);
    } catch (error) {
      console.error(error);
      throw new Error(`좋아요 버튼 동작 실패: ${error as string}`);
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
  }, [tweet.userId]);

  useEffect(() => {
    const tweetRef = doc(dataBase, "tweets", tweet.id);
    const unsubscribe = onSnapshot(tweetRef, (doc) => {
      const tweetData = doc.data();
      if (tweetData) {
        setLikes(tweetData.likes || 0);
        setLikedByUser(tweetData.likedBy?.includes(user?.uid) || false);
        if (tweetData.comments) {
          setComments(tweetData.comments);
        }
      }
    });

    return () => unsubscribe();
  }, [tweet.id, user?.uid]);

  return (
    <DetailWrapper>
      <DetailImage src={tweet.photo} alt="Detail-Image" loading="lazy" />
      <DetailContentWrapper>
        <DetailTweetWrapper>
          <DetailTweetText>{tweet.tweet}</DetailTweetText>
          <LikeButton onClick={toggleLike}>
            {likedByUser ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
            {likes}
          </LikeButton>
        </DetailTweetWrapper>
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
        {comments &&
          comments.map((comment: IComment) => (
            <CommentContainer key={comment.commentId}>
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
