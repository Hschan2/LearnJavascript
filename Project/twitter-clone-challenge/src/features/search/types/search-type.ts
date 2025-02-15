import { ITweet } from "../../tweet/types/tweet-type";

export interface SearchInputProps {
  searchWord: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export interface SearchResultsProps {
  tweets: ITweet[];
}
