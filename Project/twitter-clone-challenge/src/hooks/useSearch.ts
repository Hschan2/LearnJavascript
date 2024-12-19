import { useCallback, useEffect, useRef, useState } from "react";
import { ITweet } from "../components/types/tweet-type";
import { subscribeToTweet } from "./tweet/searchService";

export const useSearch = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchedTweet, setSearchedTweet] = useState<ITweet[]>([]);
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const changeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const onSearch = useCallback(() => {
    if (unsubscribe) unsubscribe();

    if (searchWord.trim() === "") {
      alert("검색어를 입력하세요.");
      setSearchedTweet([]);
      return;
    }

    const newUnsubscribe = subscribeToTweet(searchWord, setSearchedTweet);
    setUnsubscribe(() => newUnsubscribe);
  }, [searchWord, unsubscribe]);

  const keyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  useEffect(() => {
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [unsubscribe]);

  return {
    searchWord,
    searchedTweet,
    inputRef,
    changeSearchWord,
    onSearch,
    keyDownSearch,
  };
};
