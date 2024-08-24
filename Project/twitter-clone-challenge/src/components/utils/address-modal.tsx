import { useRef, useState } from "react";
import { AddressModalProps, AddressSearchResult } from "../types/util-type";
import {
  ModalButton,
  ModalCloseButton,
  ModalContent,
  ModalInput,
  ModalInputBar,
  ModalLi,
  ModalOverlay,
  ModalTitle,
  ModalTopWrapper,
  ModalUl,
} from "../style/modal-components";

function AddressModal({ isOpen, onClose, onSelect }: AddressModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<AddressSearchResult[]>([]);

  const searchAddress = async (query: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
    );
    const data: AddressSearchResult[] = await response.json();
    setResults(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = (
    e?:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e) e.preventDefault();

    if (query.trim() !== "" && query.length > 1) {
      searchAddress(query);
    } else {
      alert("검색어를 입력해주세요.");
      setResults([]);
    }
  };

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleResultClick = (result: AddressSearchResult) => {
    onSelect(result.display_name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <ModalTopWrapper>
          <ModalTitle>위치 검색</ModalTitle>
          <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        </ModalTopWrapper>
        <ModalInputBar>
          <ModalInput
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownSearch}
            placeholder="ex. 경복궁, 도쿄 타워"
          />
          <ModalButton onClick={handleSearch}>
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
          </ModalButton>
        </ModalInputBar>
        {results.length > 0 && (
          <ModalUl>
            {results.map((result) => (
              <ModalLi
                key={result?.place_id}
                onClick={() => handleResultClick(result)}
              >
                {result.display_name}
              </ModalLi>
            ))}
          </ModalUl>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

export default AddressModal;
