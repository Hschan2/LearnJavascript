import { useState, useRef } from "react";
import { useSearchData } from "./useSearchData";

export const useSearchAction = () => {
  const [searchWord, setSearchWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchedTweets } = useSearchData(searchWord);

  const changeSearchWord = (value: string) => setSearchWord(value);
  const onSearch = () => searchWord.trim() || alert("검색어를 입력하세요.");
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
