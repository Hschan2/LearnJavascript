import { useEffect, useState } from "react";
import { ITweet } from "../../tweet/types/tweet-type";
import { subscribeToTweet } from "./searchService";

export const useSearchData = (searchWord: string) => {
  const [searchedTweets, setSearchedTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    if (!searchWord.trim()) {
      setSearchedTweets([]);
      return;
    }
    const unsubscribe = subscribeToTweet(searchWord, setSearchedTweets);

    return () => unsubscribe();
  }, [searchWord]);

  return { searchedTweets };
};
