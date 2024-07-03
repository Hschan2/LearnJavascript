import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  limit,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { dataBase } from "../../firebase";
import { Unsubscribe } from "firebase/auth";
import { ITweet } from "../types/tweet-type";
import { SlidePhoto, SlideWrapper } from "../style/screen-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainSlide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <></>,
    nextArrow: <></>,
    autoplay: true,
    autoplaySpeed: 10000,
  };
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const mapTweetData = (doc: QueryDocumentSnapshot): ITweet => {
    const {
      tweet,
      createdAt,
      userId,
      username,
      photo,
      likes,
      likedBy,
      exclamation,
    } = doc.data();
    return {
      tweet,
      createdAt,
      userId,
      username,
      photo,
      id: doc.id,
      likes,
      likedBy,
      exclamation,
    };
  };

  const fetchTweetsData = async (
    snapshot: QuerySnapshot
  ): Promise<ITweet[]> => {
    const tweets = snapshot.docs.map(mapTweetData);

    return tweets;
  };

  const recentOneMonth = (tweets: ITweet[]) => {
    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentTweets = tweets.filter(
      (tweet) => tweet.createdAt > oneMonthAgo
    );

    return recentTweets;
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(collection(dataBase, "tweets"), limit(10));

      unsubscribe = await onSnapshot(tweetsQuery, async (snapshot) => {
        const tweets = await fetchTweetsData(snapshot);
        setTweets(recentOneMonth(tweets));
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {tweets.map((tweet, index) => (
          <SlidePhoto src={tweet?.photo} key={index} />
        ))}
      </Slider>
    </SlideWrapper>
  );
}

export default MainSlide;
