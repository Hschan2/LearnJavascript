import EmojiPicker from "./components/emoji-picker";
import {
  AttachFileButton,
  AttachFileInput,
  ButtonContainer,
  EmojiButton,
  Form,
  ImagePreview,
  MapText,
  MapWrapper,
  OptionButton,
  RemoveImageButton,
  RemoveTagButton,
  RetouchLabel,
  RetouchWrapper,
  SelectToggleButton,
  SelectWrapper,
  SelectedOptionWrapper,
  SubmitButton,
  Tag,
  TagsInput,
  TagsInputWrapper,
  TagsList,
  TextArea,
} from "./styles/form-components";
import { SELECT_OPTION_VALUE } from "../../constants";
import AddressModal from "./components/address-modal";
import { useTweetForm } from "./hooks/useTweetForm";
import { useTweet } from "./hooks/useTweet";

function PostTweetForm() {
  const {
    postState,
    updateState,
    handleFileChange,
    handleInputChange,
    handleToggle,
    handleTagAddition,
    removeTag,
    textareaRef,
  } = useTweetForm();
  const { handleSubmit } = useTweet(postState, updateState);

  return (
    <Form onSubmit={handleSubmit}>
      <AttachFileButton htmlFor="file">
        {postState.file ? (
          <ImagePreview>
            <img
              src={URL.createObjectURL(postState.file)}
              alt="preview"
              loading="lazy"
            />
            <RemoveImageButton onClick={() => updateState({ file: null })}>
              x
            </RemoveImageButton>
          </ImagePreview>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        )}
      </AttachFileButton>
      <AttachFileInput
        onChange={(e) => handleFileChange(e, "file")}
        type="file"
        id="file"
        name="imageFile"
        accept="image/*"
      />
      <MapWrapper
        onClick={() => updateState({ isModalOpen: true })}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
          />
        </svg>
        <MapText>{postState.selectedAddress || "위치 검색"}</MapText>
      </MapWrapper>
      <AddressModal
        isOpen={postState.isModalOpen}
        onClose={() => updateState({ isModalOpen: false })}
        onSelect={(address) => updateState({ selectedAddress: address })}
      />
      <TextArea
        ref={textareaRef}
        maxLength={50}
        onChange={(e) => handleInputChange(e, "tweet")}
        value={postState.tweet}
        placeholder="사진에 담긴 이야기가 무엇인가요? (50자 제한)"
      />
      <TagsInputWrapper>
        <TagsInput
          type="text"
          placeholder="태그 입력"
          value={postState.tagInput}
          onChange={(e) => handleInputChange(e, "tagInput")}
          onKeyDown={handleTagAddition}
        />
        <TagsList>
          {postState.tags.map((tag, index) => (
            <Tag key={index}>
              {tag}
              <RemoveTagButton
                onClick={(e) => {
                  e.preventDefault();
                  removeTag(index);
                }}
              >
                x
              </RemoveTagButton>
            </Tag>
          ))}
        </TagsList>
      </TagsInputWrapper>
      <RetouchWrapper>
        <RetouchLabel htmlFor="retouch">
          {postState.retouch ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            "보정파일 첨부"
          )}
        </RetouchLabel>
        <AttachFileInput
          onChange={(e) => handleFileChange(e, "retouch")}
          type="file"
          id="retouch"
          name="retouch"
          accept=".dng, .xmp, .cube"
        />
      </RetouchWrapper>
      <ButtonContainer>
        <EmojiButton
          onClick={(e) => {
            e.preventDefault();
            handleToggle("showEmojiPicker");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
        </EmojiButton>
        <SelectWrapper>
          <SelectToggleButton
            type="button"
            onClick={() => handleToggle("isSelectOpen")}
          >
            {postState.selectedOption}
          </SelectToggleButton>
          {postState.isSelectOpen && (
            <SelectedOptionWrapper>
              {SELECT_OPTION_VALUE.map((option, index) => (
                <OptionButton
                  key={index}
                  type="button"
                  onClick={() =>
                    updateState({ selectedOption: option, isSelectOpen: false })
                  }
                >
                  {option}
                </OptionButton>
              ))}
            </SelectedOptionWrapper>
          )}
        </SelectWrapper>
        <SubmitButton
          type="submit"
          value={postState.isLoading ? "보내는 중" : "보내기"}
        />
      </ButtonContainer>
      {postState.showEmojiPicker && (
        <EmojiPicker
          onSelectEmoji={(emoji) =>
            updateState({
              tweet: postState.tweet + emoji,
              showEmojiPicker: false,
            })
          }
        />
      )}
    </Form>
  );
}

export default PostTweetForm;
