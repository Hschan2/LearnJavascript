import { useNavigate } from "react-router";
import { useFileUpload } from "./useFileUpLoad";
import { auth, dataBase } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { initialState, TweetFormState } from "./useTweetForm";
import { ITweet } from "../types/tweet-type";

export const useTweet = (
  postState: TweetFormState,
  updateState: (patch: Partial<TweetFormState>) => void
) => {
  const { uploadRetouchFile, uploadTweetPhoto } = useFileUpload();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const addTweetToData = (userId: string, docData: Partial<Omit<ITweet, "id">>) =>
    addDoc(collection(dataBase, "tweets"), {
      ...docData,
      createdAt: Date.now(),
      username: user?.displayName || "익명",
      userId,
      tags: postState.tags,
      likes: postState.likes,
      likedBy: postState.likedBy,
      exclamation: postState.exclamation,
      exclamationBy: postState.exclamationBy,
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postState.file) {
      alert("사진을 추가해 주세요!");
      return;
    }
    if (!user || postState.isLoading || !postState.tweet.trim()) return;

    try {
      updateState({ isLoading: true });
      const doc = await addTweetToData(user.uid, {
        tweet: postState.tweet,
        item: postState.selectedOption,
        location: postState.selectedAddress,
      });

      if (postState.file) await uploadTweetPhoto(user.uid, doc, postState.file);
      if (postState.retouch)
        await uploadRetouchFile(user.uid, doc, postState.retouch);

      navigate("/");
      updateState({ ...initialState, isLoading: false });
    } catch (error) {
      console.error("트윗 포스팅 에러:", error);
    }
  };

  return {
    handleSubmit,
  };
};
