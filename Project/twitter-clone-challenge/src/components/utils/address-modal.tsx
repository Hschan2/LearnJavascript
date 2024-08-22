import { useRef, useState } from "react";
import { AddressModalProps, AddressSearchResult } from "../types/util-type";
import {
  ModalCloseButton,
  ModalContent,
  ModalInput,
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
    if (value.trim() !== "" && value.length > 1) {
      searchAddress(value);
    } else {
      setResults([]);
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
        <ModalInput
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="ex. 경복궁, 도쿄 타워"
        />
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
