import {
  DocumentReference,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, dataBase, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import EmojiPicker from "../utils/emoji-picker";
import {
  AttachFileButton,
  AttachFileInput,
  ButtonContainer,
  EmojiButton,
  Form,
  ImagePreview,
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
} from "../style/form-components";
import { User } from "firebase/auth";
import { useNavigate } from "react-router";
import { MAX_IMAGE_FILE_SIZE, SELECT_OPTION_VALUE } from "../../constants";

function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [retouch, setRetouch] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SELECT_OPTION_VALUE[0]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.rows = 1;
      textareaRef.current.rows = textareaRef.current.scrollHeight / 20;
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
    adjustTextareaHeight();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > MAX_IMAGE_FILE_SIZE) {
        alert("파일 첨부는 2MB 이하의 파일만 가능합니다.");
        return;
      }
      setFile(files[0]);
    }
  };

  const onRetouchFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setRetouch(files[0]);
    }
  };

  const onTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const onTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addTweetToData = (user: User) => {
    return addDoc(collection(dataBase, "tweets"), {
      tweet,
      createdAt: Date.now(),
      username: user.displayName || "익명",
      userId: user.uid,
      likes: 0,
      likedBy: [],
      exclamation: 0,
      exclamationBy: [],
      tags,
      item: selectedOption,
    });
  };

  const handleFileUpload = async (
    user: User,
    doc: DocumentReference,
    file: File
  ) => {
    const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
    const result = await uploadBytes(locationRef, file);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc, {
      photo: url,
    });
  };

  const handleRetouchFileUpload = async (
    user: User,
    doc: DocumentReference,
    retouch: File
  ) => {
    const retouchRef = ref(
      storage,
      `tweets/${user.uid}/${doc.id}/retouch/${retouch.name}`
    );
    const retouchResult = await uploadBytes(retouchRef, retouch);
    const retouchUrl = await getDownloadURL(retouchResult.ref);
    await updateDoc(doc, {
      retouch: retouchUrl,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!user || isLoading || tweet.length > 180) {
        throw new Error("글을 작성할 수 없습니다.");
      }
      if (tweet === "" || !file) {
        alert("이야기와 사진을 필수입니다.");
        throw new Error("이야기 내용이 없거나 사진이 첨부되지 않았습니다.");
      }

      setLoading(true);
      const doc = await addTweetToData(user);

      if (file) {
        await handleFileUpload(user, doc, file);
      }

      if (retouch) {
        await handleRetouchFileUpload(user, doc, retouch);
      }

      setTweet("");
      setFile(null);
      setRetouch(null);
      setTags([]);
      navigate("/");
    } catch (error) {
      console.error(error);
      throw new Error(`글 작성 실패: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleEmojiPicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowEmojiPicker((prev) => !prev);
  };

  const handleSelectEmoji = (selectedEmoji: string) => {
    setTweet((prevTweet) => prevTweet + selectedEmoji);
    if (showEmojiPicker) {
      setShowEmojiPicker(false);
    }
  };

  const toggleDropdown = () => setIsSelectOpen(!isSelectOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsSelectOpen(false);
  };

  useEffect(adjustTextareaHeight, [tweet]);

  return (
    <Form onSubmit={onSubmit}>
      <AttachFileButton htmlFor="file">
        {file ? (
          <ImagePreview>
            <img src={URL.createObjectURL(file)} alt="preview" loading="lazy" />
            <RemoveImageButton onClick={() => setFile(null)}>
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
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
        required
      />
      <TextArea
        ref={textareaRef}
        maxLength={50}
        onChange={onTextChange}
        value={tweet}
        placeholder="사진에 담긴 이야기가 무엇인가요? (50자 제한)"
        required
      />
      <TagsInputWrapper>
        <TagsInput
          type="text"
          placeholder="태그 입력"
          value={tagInput}
          onChange={onTagInputChange}
          onKeyDown={onTagInputKeyPress}
        />
        <TagsList>
          {tags.map((tag, index) => (
            <Tag key={index}>
              {tag}
              <RemoveTagButton onClick={() => removeTag(index)}>
                x
              </RemoveTagButton>
            </Tag>
          ))}
        </TagsList>
      </TagsInputWrapper>
      <RetouchWrapper>
        <RetouchLabel htmlFor="retouch">
          {retouch ? (
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
          onChange={onRetouchFileChange}
          type="file"
          id="retouch"
          name="retouch"
          accept=".dng, .xmp, .cube"
        />
      </RetouchWrapper>
      <ButtonContainer>
        <EmojiButton onClick={toggleEmojiPicker}>
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
          <SelectToggleButton type="button" onClick={toggleDropdown}>
            {selectedOption || SELECT_OPTION_VALUE[0]}
          </SelectToggleButton>
          {isSelectOpen && (
            <SelectedOptionWrapper>
              {SELECT_OPTION_VALUE.map((option, index) => (
                <OptionButton
                  key={index}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </OptionButton>
              ))}
            </SelectedOptionWrapper>
          )}
        </SelectWrapper>
        <SubmitButton
          type="submit"
          value={isLoading ? "보내는 중" : "보내기"}
        />
      </ButtonContainer>
      {showEmojiPicker && <EmojiPicker onSelectEmoji={handleSelectEmoji} />}
    </Form>
  );
}

export default PostTweetForm;
