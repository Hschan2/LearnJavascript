import { useCallback, useEffect, useState } from "react";
import { ITweet } from "../../tweet/types/tweet-type";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../../../firebase";
import useInfiniteScroll from "../../../shared/hook/useInfiniteScroll";
import { createTweetsQuery, fetchTweetsOnce } from "../../../services/tweetService";

const useProfileFetchTweet = (userId?: string) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    image: string;
  } | null>(null);

  const fetchUserProfile = useCallback(async () => {
    if (!userId) return;
    try {
      const userDocRef = doc(dataBase, "signedUsers", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data() as { name: string; image: string });
      }
    } catch (error) {
      console.error("유저 데이터 가져오기 실패: ", error);
    }
  }, [userId]);

  const fetchTweets = useCallback(async () => {
    if (!userId || !hasMore || isFetching) return;
    setIsFetching(true);

    try {
      const tweetQuery = createTweetsQuery({ userId, lastDoc });
      const { tweets: newTweets, lastDoc: newLastDoc } = await fetchTweetsOnce(tweetQuery);

      if (newTweets.length === 0) {
        setHasMore(false);
        return;
      }

      setTweets((prev) => {
        const existingIds = new Set(prev.map((tweet) => tweet.id));
        return [
          ...prev,
          ...newTweets.filter((tweet) => !existingIds.has(tweet.id)),
        ];
      });

      setLastDoc(newLastDoc);
    } finally {
      setIsFetching(false);
    }
  }, [userId, hasMore, isFetching, lastDoc]);

  const [_, triggerRef] = useInfiniteScroll(fetchTweets);

  useEffect(() => {
    fetchUserProfile();
    fetchTweets();
  }, []);

  return { tweets, triggerRef, hasMore, userProfile };
};

export default useProfileFetchTweet;
