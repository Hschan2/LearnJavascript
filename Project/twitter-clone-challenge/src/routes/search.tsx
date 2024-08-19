import React, { useState } from "react";
import {
  InputIcon,
  InputSearch,
  InputWrapper,
  SearchWrapper,
} from "../components/style/search-components";
import { ITweet } from "../components/types/tweet-type";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dataBase } from "../firebase";
import Tweet from "../components/utils/tweet";
import { Wrapper } from "../components/style/timeline-components";

function Search() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchedTweet, setSearchedTweet] = useState<ITweet[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const handleOnSearch = () => {
    if (searchWord.trim() === "") {
      alert("검색어를 입력하세요.");
      setSearchedTweet([]);
      return;
    }

    const tweetsQuery = query(
      collection(dataBase, "tweets"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
      const tweets = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as ITweet;
      });

      const FilteredSearch = tweets.filter(
        (tweet) =>
          tweet.tweet.includes(searchWord) ||
          tweet.tags?.some((tag: string) => tag.includes(searchWord))
      );

      setSearchedTweet(FilteredSearch);
    });

    return () => unsubscribe();
  };

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnSearch();
    }
  };

  return (
    <SearchWrapper>
      <InputWrapper>
        <InputSearch
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
