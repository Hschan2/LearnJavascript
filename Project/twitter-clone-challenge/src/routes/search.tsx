import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  InputIcon,
  InputSearch,
  InputWrapper,
  SearchWrapper,
} from "../components/style/search-components";
import { ITweet } from "../components/types/tweet-type";
import Tweet from "../components/utils/tweet";
import { Wrapper } from "../components/style/timeline-components";
import { subscribeToTweet } from "../hooks/tweet/searchService";

function Search() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchedTweet, setSearchedTweet] = useState<ITweet[]>([]);
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const handleOnSearch = useCallback(() => {
    if (unsubscribe) unsubscribe();

    if (searchWord.trim() === "") {
      alert("검색어를 입력하세요.");
      setSearchedTweet([]);
      return;
    }

    const newUnsubscribe = subscribeToTweet(searchWord, setSearchedTweet);
    setUnsubscribe(() => newUnsubscribe);
  }, [searchWord, unsubscribe]);

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleOnSearch();
  };

  useEffect(() => {
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [unsubscribe]);

  return (
    <SearchWrapper>
      <InputWrapper>
        <InputSearch
          ref={inputRef}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDownSearch}
          type="text"
          placeholder="검색 단어"
          value={searchWord}
          required
        />
        <InputIcon onClick={handleOnSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </InputIcon>
      </InputWrapper>
      {searchedTweet.length > 0 && (
        <Wrapper>
          {searchedTweet.map((tweet) => (
            <Tweet key={tweet.id} tweetObj={tweet} />
          ))}
        </Wrapper>
      )}
    </SearchWrapper>
  );
}

export default Search;
