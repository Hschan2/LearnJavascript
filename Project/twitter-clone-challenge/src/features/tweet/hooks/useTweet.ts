import { useNavigate } from "react-router";
import { useFileUpload } from "./useFileUpLoad";
import { auth } from "../../../firebase";
import { initialState, TweetFormState } from "./useTweetForm";
import { ITweet } from "../types/tweet-type";
import { createDocument } from "../../../services/databaseService";
import { messages, formatMessage } from "../../../message";
import { filterBadWords } from "../../../shared/filter-bad-words";
import { tweetConverter } from "../../../lib/converters";

export const useTweet = (
  postState: TweetFormState,
  updateState: (patch: Partial<TweetFormState>) => void
) => {
  const { uploadRetouchFile, uploadTweetPhoto } = useFileUpload();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const addTweetToData = (
    userId: string,
    docData: Partial<Omit<ITweet, "id">>
  ) => {
    const filteredTags = postState.tags.map((tag) => filterBadWords(tag));
    return createDocument<ITweet>(
      ["tweets"],
      {
        ...docData,
        createdAt: Date.now(),
        username: user?.displayName || "익명",
        userId,
        tags: filteredTags,
        likes: postState.likes,
        likedBy: postState.likedBy,
        exclamation: postState.exclamation,
        exclamationBy: postState.exclamationBy,
        tweet: docData.tweet || "",
        item: docData.item || "",
      } as ITweet,
      tweetConverter
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postState.file) {
      alert("사진을 추가해 주세요!");
      return;
    }
    if (!user || postState.isLoading || !postState.tweet.trim()) return;

    try {
      updateState({ isLoading: true });
      const filteredTweet = filterBadWords(postState.tweet);
      const doc = await addTweetToData(user.uid, {
        tweet: filteredTweet,
        item: postState.selectedOption,
        location: postState.selectedAddress,
      });

      if (postState.file) await uploadTweetPhoto(user.uid, doc, postState.file);
      if (postState.retouch)
        await uploadRetouchFile(user.uid, doc, postState.retouch);

      navigate("/");
      updateState({ ...initialState, isLoading: false });
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedPostTweet, {
          errorMessage: (error as Error).message,
        })
      );
    }
  };

  return {
    handleSubmit,
  };
};
