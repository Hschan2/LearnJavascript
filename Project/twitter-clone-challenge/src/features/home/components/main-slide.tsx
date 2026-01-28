import {
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { ITweet } from "../../tweet/types/tweet-type";
import {
  Image,
  SlideContent,
  SlideWrapper,
} from "../../../layout/styles/screen-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
import { getDocuments } from "../../../services/databaseService";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <></>,
  nextArrow: <></>,
  autoplay: true,
  autoplaySpeed: 3000,
};

const createTweetData = (doc: QueryDocumentSnapshot): ITweet => {
  const data = doc.data();
  return {
    tweet: data.tweet,
    createdAt: data.createdAt,
    userId: data.userId,
    username: data.username,
    photo: data.photo,
    retouch: data.retouch,
    id: doc.id,
    likes: data.likes,
    likedBy: data.likedBy,
    exclamation: data.exclamation,
    tags: data.tags,
    item: data.item,
    comments: data.comments,
    location: data.location,
  };
};

const fetchTweetsData = async (): Promise<ITweet[]> => {
  const tweetsSnapshot = await getDocuments(["tweets"]);
  return tweetsSnapshot.docs.map(createTweetData);
};

const getRandomTweets = (tweets: ITweet[], number: number) => {
  const getRandom = tweets.sort(() => 0.5 - Math.random());
  return getRandom.slice(0, number);
};

function MainSlide() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleBeforeChange = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleAfterChange = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTweetClick = useCallback(
    (tweetObj: ITweet) => {
      if (isDragging) return;
      navigate(`/detail/${tweetObj.id}`);
    },
    [navigate, isDragging]
  );

  useEffect(() => {
    const fetchAndSetTweets = async () => {
      const fetchedTweets = await fetchTweetsData();
      const randomTweets = getRandomTweets(fetchedTweets, 10);
      setTweets(randomTweets);
    };
    fetchAndSetTweets();
  }, []);

  const newSliderSettings = {
    ...sliderSettings,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  return (
    <SlideWrapper>
      <Slider {...newSliderSettings} infinite={tweets.length > 1}>
        {tweets?.map((tweetObj) => (
          <SlideContent
            key={tweetObj.id}
            onClick={() => handleTweetClick(tweetObj)}
          >
            {tweetObj.photo && (
              <Image src={tweetObj.photo} alt="Tweet Image" loading="lazy" />
            )}
          </SlideContent>
        ))}
      </Slider>
    </SlideWrapper>
  );
}

export default MainSlide;
