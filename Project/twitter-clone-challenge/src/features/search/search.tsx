import { SearchWrapper } from "./styles/search-components";
import { useSearch } from "./hooks/useSearch";
import { SearchInput } from "./components/SearchInput";
import { SearchResults } from "./components/SearchResults";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const {
    searchWord,
    searchedTweet,
    inputRef,
    changeSearchWord,
    keyDownSearch,
    onSearch,
  } = useSearch();

  useEffect(() => {
    if (tag) {
      changeSearchWord(tag);
    }
  }, [tag]);

  useEffect(() => {
    if (searchWord) {
      onSearch();
    }
  }, [searchWord]);

  return (
    <SearchWrapper>
      <SearchInput
        searchWord={searchWord}
        inputRef={inputRef}
        onChange={changeSearchWord}
        onKeyDown={keyDownSearch}
        onSearch={onSearch}
      />
      <SearchResults tweets={searchedTweet} />
    </SearchWrapper>
  );
}

export default Search;
