import { useNavigate } from "react-router";
import { auth, dataBase } from "../../../firebase";
import { useFileUpload } from "./useFileUpLoad";
import { deleteField, doc } from "firebase/firestore";
import { UpdateState } from "../types/form-type";
import { updateDocument } from "../../../services/databaseService";

type UpdateStateSetter = <K extends keyof UpdateState>(
  key: K,
  value: UpdateState[K]
) => void;

export const useUpdateTweet = (
  id: string,
  state: UpdateState,
  updateState: UpdateStateSetter
) => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { handleFileUpload, handleRetouchUpload } = useFileUpload(user);
  const tweetDocRef = doc(dataBase, "tweets", id);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.uploadedFile && !state.file) {
      alert("사진을 첨부해 주세요!");
      return;
    }
    if (
      !user ||
      state.isLoading ||
      state.tweet.trim() === "" ||
      state.tweet.length > 180
    ) {
      alert("수정할 수 없습니다. 글자 수는 180으로 제한되어 있습니다.");
      return;
    }

    updateState("isLoading", true);

    try {
      await updateDocument(["tweets", id], {
        tweet: state.tweet,
        tags: state.tags,
        item: state.selectedOption,
        location: state.selectedAddress || null,
      });

      if (state.uploadedFile)
        await handleFileUpload(state.uploadedFile, tweetDocRef);
      if (state.retouch) await handleRetouchUpload(state.retouch, tweetDocRef);
      else await updateDocument(tweetDocRef.path.split("/"), { retouch: deleteField() });

      navigate("/");
    } catch (error) {
      console.error("업데이트 실패: ", error);
    } finally {
      updateState("isLoading", false);
    }
  };

  const onTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && state.tagInput.trim()) {
      e.preventDefault();
      updateState("tags", [...state.tags, state.tagInput.trim()]);
      updateState("tagInput", "");
    }
  };

  return { onSubmit, onTagInputKeyPress };
};
