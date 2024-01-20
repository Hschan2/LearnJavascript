import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { auth, dateBase, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export interface EditTweetFormProps {
  id: string;
  onClose: () => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const ExistingPhotoContainer = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const ExistingPhoto = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const DeletePhotoButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  outline: none;

  &:hover {
    background-color: #d9363e;
  }
`;

const CancelButton = styled.button`
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

function UpdateTweetForm({ id, onClose }: EditTweetFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
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
  }

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
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
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
      <AttachFileButton htmlFor="editFile">
        {file ? "사진 추가완료✔️" : "사진 추가"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="editFile"
        accept="image/*"
      />
      <SubmitButton type="submit" value={isLoading ? "수정 중..." : "수정"} />
      <CancelButton type="button" onClick={onCancel}>
        취소
      </CancelButton>
    </Form>
  );
}

export default UpdateTweetForm;
