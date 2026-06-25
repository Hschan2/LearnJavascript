import {
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { auth, dataBase } from "../../../firebase";
import Tweet from "./tweet";
import { TimelineWrapper } from "../styles/timeline-components";
import { ITweet } from "../types/tweet-type";
import { getDocument } from "../../../services/databaseService";

const createTweetData = (doc: QueryDocumentSnapshot): ITweet => {
  const data = doc.data() as ITweet;
  return {
    ...data,
    id: doc.id,
  };
};

const fetchTweetById = async (tweetId: string): Promise<ITweet | null> => {
  const tweetDoc = await getDocument(["tweets", tweetId]);
  return tweetDoc.exists() ? createTweetData(tweetDoc) : null;
};

const useLikedTweets = (userId: string | undefined) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const fetchLikedTweets = useCallback(() => {
    if (!userId) return null;
    const likedTweetsQuery = query(
      collection(dataBase, "likedTweets"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(likedTweetsQuery, async (snapshot) => {
      const tweetIds = snapshot.docs.map((doc) => doc.data().tweetId);
      const fetchedTweets = await Promise.all(tweetIds.map(fetchTweetById));

      setTweets((prevTweets) => {
        const allTweets = [
          ...prevTweets,
          ...fetchedTweets.filter((tweet) => tweet !== null),
        ] as ITweet[];
        const uniqueTweets = allTweets.filter(
          (tweet, index, self) =>
            tweet !== null && self.findIndex((t) => t.id === tweet.id) === index
        );
        return uniqueTweets;
      });
    });

    return unsubscribe;
  }, [userId]);

  return { tweets, fetchLikedTweets };
};

function LikedTimeline() {
  const user = auth.currentUser;
  const userId = user?.uid;
  const { tweets, fetchLikedTweets } = useLikedTweets(userId);

  useEffect(() => {
    const unsubscribe = fetchLikedTweets();
    return () => unsubscribe?.();
  }, [fetchLikedTweets]);

  return (
    <TimelineWrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweetObj={tweet} />
      ))}
    </TimelineWrapper>
  );
}

export default LikedTimeline;
