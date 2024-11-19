import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import formattedDate from "../../hooks/formattedDate";
import { ITweet } from "../types/tweet-type";
import {
  ContentContainer,
  CreatedAt,
  ExclamationButton,
  InfoContents,
  LikeButton,
  Menu,
  MenuItem,
  Payload,
  Photo,
  ProfileImage,
  Tag,
  TagWrapper,
  TimeExclamationWrapper,
  TweetLikeWrapper,
  Username,
  Wrapper,
} from "../style/tweet-components";
import { useNavigate } from "react-router";
import { useTweet } from "../../hooks/tweet/useTweet";

function Tweet({ tweetObj }: { tweetObj: ITweet }) {
  const tweetIdValue = tweetObj.id;
  const user = auth.currentUser;
  const [profileImage, setProfileImage] = useState<string>("");
  const navigate = useNavigate();
  const { deleteTweet, toggleLike, toggleExclamation, fetchProfileImage } =
    useTweet();

  useEffect(() => {
    const getProfileImage = async () => {
      const image = await fetchProfileImage(tweetObj.userId);
      setProfileImage(image);
    };

    getProfileImage();
  }, [tweetObj.userId]);

  const moveDetailPage = () => {
    navigate("/detail", { state: { tweetObj } });
  };

  return (
    <Wrapper>
      <InfoContents>
        {tweetObj.photo && (
          <Photo onClick={moveDetailPage} src={tweetObj.photo} alt="Image" />
        )}
        <ContentContainer>
          <TweetLikeWrapper>
            <Payload onClick={moveDetailPage}>
              [{tweetObj.item}]{tweetObj.tweet}
            </Payload>
            <LikeButton onClick={() => toggleLike(tweetObj, user?.uid || "")}>
              {user?.uid && tweetObj.likedBy?.includes(user?.uid) ? (
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
              {tweetObj.likes}
            </LikeButton>
          </TweetLikeWrapper>
          <Username>
            {profileImage && (
              <ProfileImage src={profileImage} alt="Profile-Image" />
            )}
            {tweetObj.username}
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
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          </Username>
          {tweetObj.tags && (
            <TagWrapper>
              {tweetObj.tags?.map((tag: string, index: number) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagWrapper>
          )}
          <TimeExclamationWrapper>
            <CreatedAt>{formattedDate(tweetObj.createdAt)}</CreatedAt>
            <ExclamationButton
              onClick={() => toggleExclamation(tweetObj.id, tweetObj.userId)}
            >
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
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              {tweetObj.exclamation}
            </ExclamationButton>
          </TimeExclamationWrapper>
        </ContentContainer>
      </InfoContents>
      {user?.uid === tweetObj.userId && (
        <Menu>
          <MenuItem
            onClick={() => navigate("/update", { state: { tweetIdValue } })}
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </MenuItem>
          <MenuItem
            onClick={() => {
              const confirm = window.confirm("정말로 삭제하시겠습니까?");
              if (confirm)
                deleteTweet(tweetObj.id, tweetObj.id, tweetObj.photo);

              return;
            }}
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
          </MenuItem>
        </Menu>
      )}
    </Wrapper>
  );
}

export default Tweet;
