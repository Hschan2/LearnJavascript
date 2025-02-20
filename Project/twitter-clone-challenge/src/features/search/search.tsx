import { SearchWrapper } from "./styles/search-components";
import { SearchInput } from "./components/search-input-bar";
import { SearchResults } from "./components/search-result-list";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchAction } from "./hooks/useSearchAction";

function Search() {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const {
    searchWord,
    searchedTweets,
    inputRef,
    changeSearchWord,
    keyDownSearch,
    onSearch,
  } = useSearchAction();

  useEffect(() => {
    if (tag) {
      changeSearchWord(tag);
    }
  }, [tag]);

  return (
    <SearchWrapper>
      <SearchInput
        searchWord={searchWord}
        inputRef={inputRef}
        onChange={changeSearchWord}
        onKeyDown={keyDownSearch}
        onSearch={onSearch}
      />
      <SearchResults tweets={searchedTweets} />
    </SearchWrapper>
  );
}

export default Search;
