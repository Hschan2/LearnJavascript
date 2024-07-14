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

function Timeline({ isHot }: ITimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const mapTweetData = (doc: QueryDocumentSnapshot): ITweet => {
    const { tweet, createdAt, userId, username, photo, likes, likedBy, exclamation, tags } = doc.data();
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
      tags
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
        setTweets(recentOneMonth(tweets));
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

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

export default Timeline;
