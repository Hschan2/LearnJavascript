import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { dataBase } from "../../firebase";
import { Unsubscribe } from "firebase/auth";
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

function MainSlide() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: tweets?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <></>,
    nextArrow: <></>,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const mapTweetData = (doc: QueryDocumentSnapshot): ITweet => {
    const {
      tweet,
      createdAt,
      userId,
      username,
      photo,
      retouch,
      likes,
      likedBy,
      exclamation,
      tags,
      item,
      comments,
    } = doc.data();
    return {
      tweet,
      createdAt,
      userId,
      username,
      photo,
      retouch,
      id: doc.id,
      likes,
      likedBy,
      exclamation,
      tags,
      item,
      comments,
    };
  };

  const fetchTweetsData = async (
    snapshot: QuerySnapshot
  ): Promise<ITweet[]> => {
    const tweets = snapshot.docs.map(mapTweetData);

    return tweets;
  };

  const getRandomTweets = (tweets: ITweet[], number: number) => {
    const shuffled = tweets.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, number);
  };

  const moveDetailPage = (tweet: ITweet) => {
    const tweetObj = { ...tweet };
    navigate("/detail", { state: { tweetObj } });
  };

  useEffect(() => {
    const fetchTweets = async () => {
      const tweetsQuery = query(collection(dataBase, "tweets"));
      const tweetsSnapshot = await getDocs(tweetsQuery);
      const tweets = await fetchTweetsData(tweetsSnapshot);
      const randomTweets = getRandomTweets(tweets, 10);
      setTweets(randomTweets);
    };
    fetchTweets();
  }, []);

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {tweets?.map((tweetObj) => (
          <SlideContent
            key={tweetObj.id}
            backgroundImage={tweetObj?.photo || ""}
            onClick={() => moveDetailPage(tweetObj)}
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
