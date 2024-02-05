import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, dateBase, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import EmojiPicker from "../utils/emoji-picker";
import { AttachFileButton, AttachFileInput, ButtonContainer, EmojiButton, Form, SubmitButton, TextArea } from "../style/form-components";

function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(dateBase, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "익명",
        userId: user.uid,
        likes: 0,
        likedBy: [],
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }

      setTweet("");
      setFile(null);
    } catch (error) {
      console.log(error);
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

  return (
    <Form className="postForm" onSubmit={onSubmit}>
      <TextArea
        className="postForm"
        rows={3}
        maxLength={180}
        onChange={onTextChange}
        value={tweet}
        placeholder="당신의 이야기를 전달해 주세요."
        required
      />
      <ButtonContainer>
        <AttachFileButton htmlFor="file">
          {file ? (
            "✔️"
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
        <SubmitButton type="submit" value={isLoading ? "보내는 중" : "보내기"} />
      </ButtonContainer>
      {showEmojiPicker && <EmojiPicker onSelectEmoji={handleSelectEmoji} />}
    </Form>
  );
}

export default PostTweetForm;
