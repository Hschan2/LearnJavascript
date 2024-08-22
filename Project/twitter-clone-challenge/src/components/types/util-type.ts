export interface EmojiPickerProps {
  onSelectEmoji: (selectedEmoji: string) => void;
}

export interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
}

export interface AddressSearchResult {
  place_id: string;
  display_name: string;
}