import { useCallback, useEffect, useState } from "react";
import { ITweet } from "../../components/types/tweet-type";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dataBase } from "../../firebase";
import useInfiniteScroll from "../useInfiniteScroll";

const useProfileFetchTweet = (userId?: string) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const fetchTweets = useCallback(async () => {
    if (!userId) return;
    const tweetQuery = query(
      collection(dataBase, "tweets"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetQuery);
    const newTweets = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as ITweet[];
    setTweets((prev) => [...prev, ...newTweets]);
  }, [userId]);

  const [isFetching, triggerRef] = useInfiniteScroll(fetchTweets);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return { tweets, fetchTweets, triggerRef };
};

export default useProfileFetchTweet;
