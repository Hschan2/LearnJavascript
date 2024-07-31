import {
  deleteField,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, dataBase, storage } from "../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import EmojiPicker from "../utils/emoji-picker";
import {
  AttachFileButton,
  AttachFileInput,
  ButtonLayout,
  EmojiButton,
  Form,
  ImagePreview,
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
import { EditTweetFormProps } from "../types/form-type";
import { MAX_IMAGE_FILE_SIZE, SELECT_OPTION_VALUE } from "../../constants";
import { useNavigate } from "react-router";

function UpdateTweetForm({ id }: EditTweetFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [retouch, setRetouch] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > MAX_IMAGE_FILE_SIZE) {
        alert("파일 첨부는 2MB 이하의 파일만 가능합니다.");
        return;
      }
      setUploadedFile(files[0]);
    }
  };

  const onRetouchFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setRetouch(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!user || isLoading || tweet.length > 180) {
        throw new Error("수정할 수 없습니다.");
      }
      if (tweet === "") {
        alert("이야기를 작성해주세요.");
        throw new Error("이야기가 없습니다.");
      }
      if (!file && !uploadedFile) {
        alert("사진을 첨부해 주세요.");
        throw new Error("사진이 없습니다.");
      }
      setLoading(true);

      await updateDoc(doc(dataBase, "tweets", id), {
        tweet,
        tags,
        item: selectedOption,
      });

      if (uploadedFile) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(photoRef, uploadedFile);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(dataBase, "tweets", id), {
          photo: url,
        });
      }
      if (retouch) {
        const retouchRef = ref(
          storage,
          `tweets/${user.uid}/${id}/retouch/${retouch.name}`
        );
        const retouchResult = await uploadBytes(retouchRef, retouch);
        const retouchUrl = await getDownloadURL(retouchResult.ref);
        await updateDoc(doc(dataBase, "tweets", id), {
          retouch: retouchUrl,
        });
      } else {
        await updateDoc(doc(dataBase, "tweets", id), {
          retouch: deleteField(),
        });
      }
      navigate("/");
    } catch (error) {
      alert("글 수정에 실패하였습니다.");
      throw new Error(error as string);
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

  const fetchTweet = async () => {
    try {
      const tweetDoc = await getDoc(doc(dataBase, "tweets", id));
      if (tweetDoc.exists()) {
        const { tweet, photo, tags, item, retouch } = tweetDoc.data();
        setTweet(tweet);
        setFile(photo || null);
        setRetouch(retouch || null);
        setTags(tags);
        setSelectedOption(item);
      }
    } catch (error) {
      console.error(error);
      throw new Error(`데이터 요청: ${error}`);
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

  const toggleDropdown = () => setIsSelectOpen(!isSelectOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsSelectOpen(false);
  };

  useEffect(() => {
    fetchTweet();
  }, [id]);

  return (
    <Form onSubmit={onSubmit}>
      <AttachFileButton htmlFor="file">
        {uploadedFile ? (
          <ImagePreview>
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="preview"
              loading="lazy"
            />
            <RemoveImageButton onClick={() => setUploadedFile(null)}>
              x
            </RemoveImageButton>
          </ImagePreview>
        ) : file ? (
          <ImagePreview>
            <img src={file} alt="preview" loading="lazy" />
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
      />
      <TextArea
        rows={3}
        maxLength={180}
        onChange={onTextChange}
        value={tweet}
        placeholder="당신의 이야기를 전달해 주세요."
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
        <RemoveRetouchButton
          onClick={(e) => {
            e.preventDefault();
            setRetouch(null);
          }}
        >
          x
        </RemoveRetouchButton>
      </RetouchWrapper>
      <ButtonLayout>
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
        <SubmitButton type="submit" value={isLoading ? "수정 중..." : "수정"} />
      </ButtonLayout>
      {showEmojiPicker && <EmojiPicker onSelectEmoji={handleSelectEmoji} />}
    </Form>
  );
}

export default UpdateTweetForm;
