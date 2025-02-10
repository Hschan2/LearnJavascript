import {
  InputIcon,
  InputSearch,
  InputWrapper,
} from "../../../components/style/search-components";

interface SearchInputProps {
  searchWord: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const SearchInput = ({
  searchWord,
  inputRef,
  onChange,
  onKeyDown,
  onSearch,
}: SearchInputProps) => (
  <InputWrapper>
    <InputSearch
      ref={inputRef}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      type="text"
      placeholder="검색 단어"
      value={searchWord}
      required
    />
    <InputIcon onClick={onSearch}>
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
);
