import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
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
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function LikedTimeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const user = auth.currentUser;

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

  const fetchTweetById = async (tweetId: string) => {
    const tweetDoc = await getDoc(doc(dataBase, "tweets", tweetId));
    if (tweetDoc.exists()) {
      return mapTweetData(tweetDoc);
    }

    return null;
  };

  const fetchMoreData = async () => {
    if (!user) return;
    let unsubscribe: Unsubscribe | null = null;
    const fetchLikedTweets = async () => {
      const likedTweetsQuery = query(
        collection(dataBase, "likedTweets"),
        where("userId", "==", user.uid)
      );

      unsubscribe = await onSnapshot(likedTweetsQuery, async (snapshot) => {
        const tweetIds = snapshot.docs.map((doc) => doc.data().tweetId);
        const tweetPromises = tweetIds.map(fetchTweetById);
        const fetchedTweets = await Promise.all(tweetPromises);
        const recentTweets = fetchedTweets.filter(
          (tweet) =>
            tweet && tweet.createdAt > Date.now() - 30 * 24 * 60 * 60 * 1000
        ) as ITweet[];
        setTweets(recentTweets);
      });
    };
    fetchLikedTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  };

  // const [isFetching, triggerRef] = useInfiniteScroll(fetchMoreData);

  useEffect(() => {
    fetchMoreData();
  }, [user]);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

export default LikedTimeline;
