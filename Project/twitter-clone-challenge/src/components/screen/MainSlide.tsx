import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { dataBase } from "../../firebase";
import { ITweet } from "../types/tweet-type";
import {
  Overlay,
  SlideContent,
  SlideWrapper,
  TextContent,
  Tweet,
} from "../style/screen-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <></>,
  nextArrow: <></>,
  autoplay: true,
  autoplaySpeed: 5000,
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
  const tweetsQuery = query(collection(dataBase, "tweets"));
  const tweetsSnapshot = await getDocs(tweetsQuery);
  return tweetsSnapshot.docs.map(createTweetData);
};

const getRandomTweets = (tweets: ITweet[], number: number) => {
  const getRandom = tweets.sort(() => 0.5 - Math.random());
  return getRandom.slice(0, number);
};

function MainSlide() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const navigate = useNavigate();

  const handleTweetClick = useCallback(
    (tweetObj: ITweet) => {
      navigate(`/detail/${tweetObj.id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const fetchAndSetTweets = async () => {
      const fetchedTweets = await fetchTweetsData();
      const randomTweets = getRandomTweets(fetchedTweets, 10);
      setTweets(randomTweets);
    };
    fetchAndSetTweets();
  }, []);

  return (
    <SlideWrapper>
      <Slider {...sliderSettings} infinite={tweets.length > 1}>
        {tweets?.map((tweetObj) => (
          <SlideContent
            key={tweetObj.id}
            $backgroundImage={tweetObj?.photo || ""}
            onClick={() => handleTweetClick(tweetObj)}
          >
            <Overlay />
            <TextContent>
              <Tweet>{tweetObj?.tweet}</Tweet>
            </TextContent>
          </SlideContent>
        ))}
      </Slider>
    </SlideWrapper>
  );
}

export default MainSlide;
