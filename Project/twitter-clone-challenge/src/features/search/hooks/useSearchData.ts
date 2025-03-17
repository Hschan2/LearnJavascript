import { useEffect, useState } from "react";
import { ITweet } from "../../tweet/types/tweet-type";
import { subscribeToTweet } from "./searchService";

export const useSearchData = (searchWord: string) => {
  const [searchedTweets, setSearchedTweets] = useState<ITweet[]>([]);
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (unsubscribe) unsubscribe();
    if (!searchWord.trim()) {
      setSearchedTweets([]);
      return;
    }
    const newUnsubscribe = subscribeToTweet(searchWord, setSearchedTweets);
    setUnsubscribe(() => newUnsubscribe);

    return () => newUnsubscribe();
  }, [searchWord]);

  useEffect(() => () => unsubscribe?.(), [unsubscribe]);

  return { searchedTweets };
};
