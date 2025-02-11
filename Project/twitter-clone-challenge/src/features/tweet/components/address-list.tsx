import { ModalLi, ModalUl } from "../styles/modal-components";
import { AddressSearchResult } from "../types/util-type";

interface AddressListProps {
  results: AddressSearchResult[];
  onSelect: (address: string) => void;
}

export const AddressList = ({ results, onSelect }: AddressListProps) => {
  if (!results.length) return null;

  return (
    <ModalUl>
      {results.map((result) => (
        <ModalLi
          key={result?.place_id}
          onClick={() => onSelect(result.display_name)}
        >
          {result.display_name}
        </ModalLi>
      ))}
    </ModalUl>
  );
};
