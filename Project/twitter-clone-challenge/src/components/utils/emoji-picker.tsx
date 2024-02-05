import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { EmojiPickerProps } from "../types/util-type";

function EmojiPicker({ onSelectEmoji }: EmojiPickerProps) {
  return (
    <div>
      <Picker
        data={data}
        onEmojiSelect={(emoji: any) => onSelectEmoji(emoji.native)}
      />
    </div>
  );
}

export default EmojiPicker;
