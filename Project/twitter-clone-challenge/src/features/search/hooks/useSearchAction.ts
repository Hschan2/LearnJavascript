import { useState, useRef } from "react";
import { useSearchData } from "./useSearchData";
import { SERVICE_MESSAGE } from "../../../message";

export const useSearchAction = () => {
  const [searchWord, setSearchWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchedTweets } = useSearchData(searchWord);

  const changeSearchWord = (value: string) => setSearchWord(value);
  const onSearch = () => {
    if (!searchWord.trim()) {
      alert(SERVICE_MESSAGE.INPUT_SEARCHING_WORD);
      return;
    }
    setSearchWord(searchWord.trim());
  };
  const keyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return {
    searchWord,
    searchedTweets,
    inputRef,
    changeSearchWord,
    onSearch,
    keyDownSearch,
  };
};
