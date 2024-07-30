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

function DetailTweet() {
  const [profileImage, setProfileImage] = useState<string>("");
  const location = useLocation();
  const tweet = location.state?.tweetObj;
  const createdAt = tweet?.createdAt;
  const createdDate = formattedDate({ createdAt });
  const avatar = auth.currentUser?.photoURL;
  const [comment, setComment] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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
        <Form className="comment">
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
    </DetailWrapper>
  );
}

export default DetailTweet;
