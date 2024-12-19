import { SearchWrapper } from "../components/style/search-components";
import { useSearch } from "../hooks/useSearch";
import { SearchInput } from "./components/SearchInput";
import { SearchResults } from "./components/SearchResults";

function Search() {
  const {
    searchWord,
    searchedTweet,
    inputRef,
    changeSearchWord,
    keyDownSearch,
    onSearch,
  } = useSearch();

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
