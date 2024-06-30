import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, dataBase } from "../../firebase";
import Tweet from "../utils/tweet";
import { Unsubscribe } from "firebase/auth";
import { Wrapper } from "../style/timeline-components";
import { ITweet } from "../types/tweet-type";

function LikedTimeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const user = auth.currentUser;

  const mapTweetData = (doc: QueryDocumentSnapshot): ITweet => {
    const { tweet, createdAt, userId, username, photo, likes, exclamation } =
      doc.data();
    return {
      tweet,
      createdAt,
      userId,
      username,
      photo,
      id: doc.id,
      likes,
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
    if (!user) return;
    let unsubscribe: Unsubscribe | null = null;
    const fetchLikedTweets = async () => {
      const likedTweetsQuery = query(
          collection(dataBase, "likedTweets"),
          where("userId", "==", user.uid)
      );

      unsubscribe = await onSnapshot(likedTweetsQuery, async (snapshot) => {
        const likedTweets = await fetchTweetsData(snapshot);
        setTweets(recentOneMonth(likedTweets));
      });
    };
    fetchLikedTweets();
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

export default LikedTimeline;
