import { deleteField, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, dataBase } from "../../firebase";
import EmojiPicker from "../utils/emoji-picker";
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
} from "../style/form-components";
import { EditTweetFormProps, UpdateState } from "../types/form-type";
import { SELECT_OPTION_VALUE } from "../../constants";
import { useNavigate } from "react-router";
import AddressModal from "../utils/address-modal";
import { useFileUpload } from "../../hooks/form/useFileUpLoad";
import { useFetchTweet } from "../../hooks/form/useFetchTweet";

function UpdateTweetForm({ id }: EditTweetFormProps) {
  const [updateState, setUpdateState] = useState<UpdateState>({
    isLoading: false,
    tweet: "",
    tags: [] as string[],
    tagInput: "",
    file: null as File | string | null,
    retouch: null as File | null,
    uploadedFile: null as File | null,
    showEmojiPicker: false,
    isSelectOpen: false,
    selectedOption: "",
    isModalOpen: false,
    selectedAddress: "",
  });
  const user = auth.currentUser;
  const navigate = useNavigate();
  const tweetDocRef = doc(dataBase, "tweets", id);

  const updatePostState = <K extends keyof UpdateState>(
    key: K,
    value: UpdateState[K]
  ) => {
    setUpdateState((prev) => ({ ...prev, [key]: value }));
  };

  const { handleFileUpload, handleRetouchUpload } = useFileUpload(user, id);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !user ||
      updateState.isLoading ||
      updateState.tweet.trim() === "" ||
      updateState.tweet.length > 180
    ) {
      alert("수정할 수 없습니다. 글자 수는 180으로 제한되어 있습니다.");
      return;
    }

    updatePostState("isLoading", true);
    try {
      await updateDoc(doc(dataBase, "tweets", id), {
        tweet: updateState.tweet,
        tags: updateState.tags,
        item: updateState.selectedOption,
        location: updateState.selectedAddress,
      });

      if (updateState.uploadedFile) {
        await handleFileUpload(updateState.uploadedFile, tweetDocRef);
      }
      if (updateState.retouch) {
        await handleRetouchUpload(updateState.retouch, tweetDocRef);
      } else {
        await updateDoc(doc(dataBase, "tweets", id), {
          retouch: deleteField(),
        });
      }
      navigate("/");
    } catch (error) {
      console.error("업데이트 실패: ", error);
    } finally {
      updatePostState("isLoading", false);
    }
  };

  const onTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && updateState.tagInput.trim()) {
      e.preventDefault();
      updatePostState("tags", [
        ...updateState.tags,
        updateState.tagInput.trim(),
      ]);
      updatePostState("tagInput", "");
    }
  };

  const { fetchTweetData } = useFetchTweet(id, (data) => {
    setUpdateState({
      ...updateState,
      tweet: data.tweet,
      file: data.photo || null,
      tags: data.tags,
      selectedOption: data.item,
      selectedAddress: data.location,
    });
  });

  useEffect(() => {
    fetchTweetData();
  }, [id]);

  return (
    <Form onSubmit={onSubmit}>
      <AttachFileButton htmlFor="file">
        {updateState.uploadedFile ? (
          <ImagePreview>
            <img
              src={URL.createObjectURL(updateState.uploadedFile)}
              alt="preview"
              loading="lazy"
            />
            <RemoveImageButton
              onClick={() => updatePostState("uploadedFile", null)}
            >
              x
            </RemoveImageButton>
          </ImagePreview>
        ) : updateState.file ? (
          <ImagePreview>
            <img
              src={
                typeof updateState.file === "string"
                  ? updateState.file
                  : URL.createObjectURL(updateState.file)
              }
              alt="preview"
              loading="lazy"
            />
            <RemoveImageButton onClick={() => updatePostState("file", null)}>
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
          updatePostState(
            "uploadedFile",
            e.target.files ? e.target.files[0] : null
          )
        }
        type="file"
        id="file"
        name="imageFile"
        accept="image/*"
      />
      <MapWrapper
        onClick={(e) => {
          e.preventDefault();
          updatePostState("isModalOpen", true);
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
        <MapText>{updateState.selectedAddress || "위치 검색"}</MapText>
      </MapWrapper>
      <AddressModal
        isOpen={updateState.isModalOpen}
        onClose={() => updatePostState("isModalOpen", false)}
        onSelect={(address) => updatePostState("selectedAddress", address)}
      />
      <TextArea
        rows={3}
        maxLength={180}
        onChange={(e) => updatePostState("tweet", e.target.value)}
        value={updateState.tweet}
        placeholder="당신의 이야기를 전달해 주세요."
        required
      />
      <TagsInputWrapper>
        <TagsInput
          type="text"
          placeholder="태그 입력"
          value={updateState.tagInput}
          onChange={(e) => updatePostState("tagInput", e.target.value)}
          onKeyDown={onTagInputKeyPress}
        />
        <TagsList>
          {updateState.tags.map((tag, index) => (
            <Tag key={index}>
              {tag}
              <RemoveTagButton
                onClick={(e) => {
                  e.preventDefault();
                  updatePostState(
                    "tags",
                    updateState.tags.filter((_, i) => i !== index)
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
          {updateState.retouch ? (
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
            updatePostState(
              "retouch",
              e.target.files ? e.target.files[0] : null
            )
          }
          type="file"
          id="retouch"
          name="retouch"
          accept=".dng, .xmp, .cube"
        />
        <RemoveRetouchButton
          onClick={(e) => {
            e.preventDefault();
            updatePostState("retouch", null);
          }}
        >
          x
        </RemoveRetouchButton>
      </RetouchWrapper>
      <ButtonLayout>
        <EmojiButton
          onClick={(e) => {
            e.preventDefault();
            updatePostState("showEmojiPicker", !updateState.showEmojiPicker);
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
            onClick={() =>
              updatePostState("isSelectOpen", !updateState.isSelectOpen)
            }
          >
            {updateState.selectedOption || SELECT_OPTION_VALUE[0]}
          </SelectToggleButton>
          {updateState.isSelectOpen && (
            <SelectedOptionWrapper>
              {SELECT_OPTION_VALUE.map((option, index) => (
                <OptionButton
                  key={index}
                  type="button"
                  onClick={() => {
                    updatePostState("isSelectOpen", false);
                    updatePostState("selectedOption", option);
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
          value={updateState.isLoading ? "수정 중..." : "수정"}
        />
      </ButtonLayout>
      {updateState.showEmojiPicker && (
        <EmojiPicker
          onSelectEmoji={(emoji) => {
            updatePostState("tweet", updateState.tweet + emoji);
            updatePostState("showEmojiPicker", false);
          }}
        />
      )}
    </Form>
  );
}

export default UpdateTweetForm;
