import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { dataBase } from "../../firebase";
import Tweet from "../utils/tweet";
import { Unsubscribe } from "firebase/auth";
import { Wrapper } from "../style/timeline-components";
import { ITimeline, ITweet } from "../types/tweet-type";

function Timeline({ isHot, option = "전체" }: ITimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<ITweet[]>([]);

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
      tags,
      item,
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
      tags,
      item,
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

  const filterTweets = (tweets: ITweet[], option: string) => {
    if (option === "전체") {
      return tweets;
    }

    return tweets.filter((tweet: ITweet) => tweet.item === option);
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const orderBys = isHot
        ? [orderBy("likes", "desc"), orderBy("createdAt", "desc")]
        : [orderBy("createdAt", "desc")];

      const tweetsQuery = query(
        collection(dataBase, "tweets"),
        ...orderBys,
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetsQuery, async (snapshot) => {
        const tweets = await fetchTweetsData(snapshot);
        const recentTweets = recentOneMonth(tweets);
        setTweets(recentTweets);
        setFilteredTweets(filterTweets(recentTweets, option || "전체"));
      });

      // const snapshot = await getDocs(tweetsQuery);
      // const tweets = await fetchTweetsData(snapshot);
      // setTweets(recentOneMonth(tweets));
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(() => {
    setFilteredTweets(filterTweets(tweets, option || "전체"));
  }, [option, tweets]);

  return (
    <Wrapper>
      {filteredTweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

export default Timeline;
