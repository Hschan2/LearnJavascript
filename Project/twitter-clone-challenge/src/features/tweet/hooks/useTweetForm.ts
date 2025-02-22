import { useEffect, useRef, useState } from "react";
import { MAX_IMAGE_FILE_SIZE, SELECT_OPTION_VALUE } from "../../../constants";

export const initialState = {
  isLoading: false,
  tweet: "",
  tags: [] as string[],
  tagInput: "",
  file: null as File | null,
  retouch: null as File | null,
  showEmojiPicker: false,
  isSelectOpen: false,
  selectedOption: SELECT_OPTION_VALUE[0],
  isModalOpen: false,
  selectedAddress: "",
  likes: 0,
  likedBy: [] as string[],
  exclamation: 0,
  exclamationBy: [] as string[],
};

export const useTweetForm = () => {
  const [postState, setPostState] = useState(initialState);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const updateState = (newState: Partial<typeof postState>) =>
    setPostState((prev) => ({ ...prev, ...newState }));

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.rows = 1;
      textareaRef.current.rows = textareaRef.current.scrollHeight / 20;
    }
  }, [postState.tweet]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "file" | "retouch"
  ) => {
    const { files } = e.target;
    if (files && files[0].size > MAX_IMAGE_FILE_SIZE) {
      alert("파일 사이즈는 2MB 이하만 가능합니다.");
      return;
    }
    updateState({ [type]: files ? files[0] : null });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof typeof postState
  ) => updateState({ [key]: e.target.value });

  const handleToggle = (key: keyof typeof postState) =>
    updateState({ [key]: !postState[key] });

  const handleTagAddition = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && postState.tagInput.trim() !== "") {
      e.preventDefault();
      updateState({
        tags: [...postState.tags, postState.tagInput.trim()],
        tagInput: "",
      });
    }
  };

  const removeTag = (index: number) => {
    updateState({ tags: postState.tags.filter((_, i) => i !== index) });
  };

  return {
    postState,
    updateState,
    handleFileChange,
    handleInputChange,
    handleToggle,
    handleTagAddition,
    removeTag,
    textareaRef,
  };
};
