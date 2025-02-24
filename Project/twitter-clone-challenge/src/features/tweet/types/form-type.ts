export type UpdateState = {
  isLoading: boolean;
  tweet: string;
  tags: string[];
  tagInput: string;
  file: File | string | null;
  retouch: File | null;
  uploadedFile: File | null;
  showEmojiPicker: boolean;
  isSelectOpen: boolean;
  selectedOption: string;
  isModalOpen: boolean;
  selectedAddress: string;
};
