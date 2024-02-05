export interface EmojiPickerProps {
  onSelectEmoji: (selectedEmoji: string) => void;
}

export interface ImageModalProps {
  onClose: () => void;
  imageUrl: string | undefined;
}
