import { useCallback, useEffect, useState } from "react";
import { ITweet } from "../../tweet/types/tweet-type";
import { QueryDocumentSnapshot } from "firebase/firestore";
import useInfiniteScroll from "../../../shared/hook/useInfiniteScroll";
import {
  createTweetsQuery,
  fetchTweetsOnce,
} from "../../../services/tweetService";
import { UserService } from "../../../services/userService";
import { IUser } from "../types/user-type";
import { messages, formatMessage } from "../../../message";

const useProfileFetchTweet = (userId?: string) => {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<ITweet> | null>(
    null
  );
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  const fetchUserProfile = useCallback(async () => {
    if (!userId) return;
    try {
      const userData = await UserService.getUserData(userId);
      if (userData) {
        setUserProfile(userData);
      }
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedFetchUserData, {
          errorMessage: (error as Error).message,
        })
      );
    }
  }, [userId]);

  const fetchTweets = useCallback(async () => {
    if (!userId || !hasMore || isFetching) return;
    setIsFetching(true);

    try {
      const tweetQuery = createTweetsQuery({ userId, lastDoc });
      const { tweets: newTweets, lastDoc: newLastDoc } = await fetchTweetsOnce(
        tweetQuery
      );

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
  }, [userId]);

  return { tweets, triggerRef, hasMore, userProfile };
};

export default useProfileFetchTweet;
