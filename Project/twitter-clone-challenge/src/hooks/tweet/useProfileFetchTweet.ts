import { useCallback, useEffect, useState } from "react";
import { ITweet } from "../../components/types/tweet-type";
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { dataBase } from "../../firebase";
import useInfiniteScroll from "../useInfiniteScroll";

const useProfileFetchTweet = (userId?: string) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchTweets = useCallback(async () => {
    if (!userId || !hasMore) return;
    const tweetQuery = lastDoc
      ? query(
          collection(dataBase, "tweets"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc)
        )
      : query(
          collection(dataBase, "tweets"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
    const snapshot = await getDocs(tweetQuery);

    if (snapshot.empty) {
      setHasMore(false);
      return;
    }

    const newTweets = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as ITweet[];
    setTweets((prev) => [...prev, ...newTweets]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  }, [userId, lastDoc, hasMore]);

  const [_, triggerRef] = useInfiniteScroll(fetchTweets);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return { tweets, fetchTweets, triggerRef, hasMore };
};

export default useProfileFetchTweet;
