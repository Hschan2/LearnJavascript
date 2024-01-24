import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
  onSelectEmoji: (selectedEmoji: string) => void;
}

function EmojiPicker({ onSelectEmoji }: EmojiPickerProps) {
  return (
    <div>
      <Picker data={data} onEmojiSelect={(emoji: any) => onSelectEmoji(emoji.native)} />
    </div>
  );
}

export default EmojiPicker;
