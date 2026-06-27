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
import { PAGE_SIZE } from "../../../constants";

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

  const fetchInitialTweets = useCallback(async () => {
    if (!userId) return;

    setIsFetching(true);
    setTweets([]);
    setLastDoc(null);
    setHasMore(true);

    try {
      const tweetQuery = createTweetsQuery({
        userId,
        limitCount: PAGE_SIZE,
      });
      const { tweets: initialTweets, lastDoc: newLastDoc } =
        await fetchTweetsOnce(tweetQuery);

      setTweets(initialTweets);
      setLastDoc(newLastDoc);
      setHasMore(initialTweets.length === PAGE_SIZE);
    } finally {
      setIsFetching(false);
    }
  }, [userId]);

  const fetchMoreTweets = useCallback(async () => {
    if (!userId || !hasMore || isFetching || !lastDoc) return;
    setIsFetching(true);

    try {
      const tweetQuery = createTweetsQuery({
        userId,
        lastDoc,
        limitCount: PAGE_SIZE,
      });
      const { tweets: newTweets, lastDoc: newLastDoc } = await fetchTweetsOnce(
        tweetQuery
      );

      if (newTweets.length < PAGE_SIZE) {
        setHasMore(false);
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

  const [_, triggerRef] = useInfiniteScroll(fetchMoreTweets);

  useEffect(() => {
    fetchUserProfile();
    fetchInitialTweets();
  }, [fetchUserProfile, fetchInitialTweets]);

  return { tweets, triggerRef, hasMore, userProfile };
};

export default useProfileFetchTweet;
