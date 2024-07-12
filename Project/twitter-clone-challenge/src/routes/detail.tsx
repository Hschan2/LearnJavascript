import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  DetailTweetText,
  DetailImage,
  DetailProfileWrapper,
  DetailWrapper,
  ProfileImage,
  DetailContentWrapper,
} from "../components/style/tweet-components";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

function DetailTweet() {
  const [profileImage, setProfileImage] = useState<string>("");
  const location = useLocation();
  const tweet = location.state?.tweetObj;

  if (!tweet) return <div>데이터를 불러올 수 없습니다.</div>;

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
      </DetailContentWrapper>
    </DetailWrapper>
  );
}

export default DetailTweet;
