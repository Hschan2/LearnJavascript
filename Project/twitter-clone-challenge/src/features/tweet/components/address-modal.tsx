import { useRef, useState } from "react";
import { AddressModalProps } from "../types/util-type";
import {
  ModalButton,
  ModalCloseButton,
  ModalContent,
  ModalInput,
  ModalInputBar,
  ModalOverlay,
  ModalTitle,
  ModalTopWrapper,
} from "../styles/modal-components";
import { useAddressSearch } from "../hooks/useAddressSearch";
import { AddressList } from "./address-list";

function AddressModal({ isOpen, onClose, onSelect }: AddressModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const { results, isLoading, error, searchAddress } = useAddressSearch(
    "https://nominatim.openstreetmap.org/search"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim().length > 1) {
      searchAddress(query);
    } else {
      alert("검색어를 입력해 주세요.");
    }
  };

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleResultSelect = (address: string) => {
    onSelect(address);
    onClose();
  }

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
        {isLoading && <p>검색중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <AddressList results={results} onSelect={handleResultSelect} />
      </ModalContent>
    </ModalOverlay>
  );
}

export default AddressModal;
