import EmojiPicker from "./components/emoji-picker";
import {
  AttachFileButton,
  AttachFileInput,
  ButtonLayout,
  EmojiButton,
  Form,
  ImagePreview,
  MapText,
  MapWrapper,
  OptionButton,
  RemoveImageButton,
  RemoveRetouchButton,
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
import { useUpdateFetchTweetData } from "./hooks/useUpdateFetchTweetData";
import { useUpdateTweet } from "./hooks/useUpdateTweet";

function UpdateTweetForm({ id }: { id: string }) {
  const { state, updateState } = useUpdateFetchTweetData(id);
  const { onSubmit, onTagInputKeyPress } = useUpdateTweet(
    id,
    state,
    updateState
  );

  return (
    <Form onSubmit={onSubmit}>
      <AttachFileButton htmlFor="file">
        {state.uploadedFile ? (
          <ImagePreview>
            <img
              src={URL.createObjectURL(state.uploadedFile)}
              alt="preview"
              loading="lazy"
            />
            <RemoveImageButton
              onClick={() => updateState("uploadedFile", null)}
            >
              x
            </RemoveImageButton>
          </ImagePreview>
        ) : state.file ? (
          <ImagePreview>
            <img
              src={
                typeof state.file === "string"
                  ? state.file
                  : URL.createObjectURL(state.file)
              }
              alt="preview"
              loading="lazy"
            />
            <RemoveImageButton onClick={() => updateState("file", null)}>
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
        onChange={(e) =>
          updateState("uploadedFile", e.target.files?.[0] ?? null)
        }
        type="file"
        id="file"
        name="imageFile"
        accept="image/*"
      />
      <MapWrapper
        onClick={(e) => {
          e.preventDefault();
          updateState("isModalOpen", true);
        }}
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
        <MapText>{state.selectedAddress || "위치 검색"}</MapText>
      </MapWrapper>
      <AddressModal
        isOpen={state.isModalOpen}
        onClose={() => updateState("isModalOpen", false)}
        onSelect={(address) => updateState("selectedAddress", address)}
      />
      <TextArea
        rows={3}
        maxLength={180}
        onChange={(e) => updateState("tweet", e.target.value)}
        value={state.tweet}
        placeholder="당신의 이야기를 전달해 주세요."
        required
      />
      <TagsInputWrapper>
        <TagsInput
          type="text"
          placeholder="태그 입력"
          value={state.tagInput}
          onChange={(e) => updateState("tagInput", e.target.value)}
          onKeyDown={onTagInputKeyPress}
        />
        <TagsList>
          {state.tags.map((tag, index) => (
            <Tag key={index}>
              {tag}
              <RemoveTagButton
                onClick={(e) => {
                  e.preventDefault();
                  updateState(
                    "tags",
                    state.tags.filter((_, i) => i !== index)
                  );
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
          {state.retouch ? (
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
          onChange={(e) =>
            updateState("retouch", e.target.files ? e.target.files[0] : null)
          }
          type="file"
          id="retouch"
          name="retouch"
          accept=".dng, .xmp, .cube"
        />
        <RemoveRetouchButton
          onClick={(e) => {
            e.preventDefault();
            updateState("retouch", null);
          }}
        >
          x
        </RemoveRetouchButton>
      </RetouchWrapper>
      <ButtonLayout>
        <EmojiButton
          onClick={(e) => {
            e.preventDefault();
            updateState("showEmojiPicker", !state.showEmojiPicker);
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
            onClick={() => updateState("isSelectOpen", !state.isSelectOpen)}
          >
            {state.selectedOption || SELECT_OPTION_VALUE[0]}
          </SelectToggleButton>
          {state.isSelectOpen && (
            <SelectedOptionWrapper>
              {SELECT_OPTION_VALUE.map((option, index) => (
                <OptionButton
                  key={index}
                  type="button"
                  onClick={() => {
                    updateState("isSelectOpen", false);
                    updateState("selectedOption", option);
                  }}
                >
                  {option}
                </OptionButton>
              ))}
            </SelectedOptionWrapper>
          )}
        </SelectWrapper>
        <SubmitButton
          type="submit"
          value={state.isLoading ? "수정 중..." : "수정"}
          disabled={state.isLoading}
        />
      </ButtonLayout>
      {state.showEmojiPicker && (
        <EmojiPicker
          onSelectEmoji={(emoji) => {
            updateState("tweet", state.tweet + emoji);
            updateState("showEmojiPicker", false);
          }}
        />
      )}
    </Form>
  );
}

export default UpdateTweetForm;
