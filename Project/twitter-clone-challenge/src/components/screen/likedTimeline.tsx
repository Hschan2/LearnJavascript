import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { auth, dataBase } from "../../firebase";
import Tweet from "../utils/tweet";
import { Wrapper } from "../style/timeline-components";
import { ITweet } from "../types/tweet-type";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const createTweetData = (doc: QueryDocumentSnapshot): ITweet => {
  const data = doc.data() as ITweet;
  return {
    ...data,
    id: doc.id,
  };
};

const fetchTweetById = async (tweetId: string): Promise<ITweet | null> => {
  const tweetDoc = await getDoc(doc(dataBase, "tweets", tweetId));
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

    return onSnapshot(likedTweetsQuery, async (snapshot) => {
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
  }, [userId]);

  return { tweets, fetchLikedTweets };
};

function LikedTimeline() {
  const user = auth.currentUser;
  const userId = user?.uid;
  const { tweets, fetchLikedTweets } = useLikedTweets(userId);

  const fetchMoreData = useCallback(async () => {
    await fetchLikedTweets();
  }, [fetchLikedTweets]);

  const [isFetching, triggerRef] = useInfiniteScroll(fetchMoreData);

  useEffect(() => {
    const initFetch = async () => {
      const unsubscribe = await fetchLikedTweets();
      return () => unsubscribe && unsubscribe();
    };

    const unsubscribeEffect = initFetch();
    return () => {
      unsubscribeEffect.then((cleanUp) => cleanUp && cleanUp());
    };
  }, [fetchLikedTweets]);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweetObj={tweet} />
      ))}
      <div ref={triggerRef}></div>
    </Wrapper>
  );
}

export default LikedTimeline;
