import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, dateBase, storage } from "../../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import EmojiPicker from "../utils/emoji-picker";
import {
  AttachFileButton,
  AttachFileInput,
  ButtonLayout,
  CancelButton,
  DeletePhotoButton,
  EmojiButton,
  ExistingPhoto,
  ExistingPhotoContainer,
  Form,
  SubmitButton,
  TextArea,
} from "../style/form-components";
import { EditTweetFormProps } from "../types/form-type";

function UpdateTweetForm({ id, onClose }: EditTweetFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = auth.currentUser;

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onDeletePhoto = async () => {
    if (existingPhoto) {
      try {
        const photoRef = ref(storage, existingPhoto);
        await deleteObject(photoRef);
        const tweetDocRef = doc(dateBase, "tweets", id);
        await updateDoc(tweetDocRef, { photo: null });
        setExistingPhoto(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);

      if (existingPhoto && file) {
        const existingPhotoRef = ref(storage, existingPhoto);
        await deleteObject(existingPhotoRef);
      }

      await updateDoc(doc(dateBase, "tweets", id), {
        tweet,
      });

      if (file) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(photoRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(dateBase, "tweets", id), {
          photo: url,
        });
      }

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    onClose();
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

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const tweetDoc = await getDoc(doc(dateBase, "tweets", id));
        if (tweetDoc.exists()) {
          const { tweet, photo } = tweetDoc.data();
          setTweet(tweet);
          setExistingPhoto(photo || null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTweet();
  }, [id]);

  return (
    <Form className="updateForm" onSubmit={onSubmit}>
      <TextArea
        className="updateForm"
        rows={3}
        maxLength={180}
        onChange={onTextChange}
        value={tweet}
        placeholder="당신의 이야기를 전달해 주세요."
        required
      />
      {existingPhoto && (
        <ExistingPhotoContainer>
          <ExistingPhoto src={existingPhoto} alt="Previous Photo" />
          <DeletePhotoButton type="button" onClick={onDeletePhoto}>
            X
          </DeletePhotoButton>
        </ExistingPhotoContainer>
      )}
      <ButtonLayout>
        <AttachFileButton htmlFor="editFile">
          {file ? "사진 추가완료✔️" : "사진 추가"}
        </AttachFileButton>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="editFile"
          accept="image/*"
        />
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
        <SubmitButton type="submit" value={isLoading ? "수정 중..." : "수정"} />
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
      </ButtonLayout>
      {showEmojiPicker && <EmojiPicker onSelectEmoji={handleSelectEmoji} />}
    </Form>
  );
}

export default UpdateTweetForm;
