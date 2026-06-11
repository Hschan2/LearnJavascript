import { useReducer } from "react";
import { UpdateState } from "../types/form-type";
import { checkBadWords } from "../../../shared/filter-bad-words";

type Action<k extends keyof UpdateState> = { type: k; payload: UpdateState[k] };

const reducer = (state: UpdateState, action: Action<keyof UpdateState>) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

export const useUpdateTweetState = () => {
  const [state, dispatch] = useReducer(reducer, {
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
    hasBadWords: false,
  });

  const updateState = <k extends keyof UpdateState>(
    key: k,
    value: UpdateState[k]
  ) => {
    if ((key === "tweet" || key === "tagInput") && typeof value === "string") {
      const hasBadWords = checkBadWords(value);
      dispatch({ type: key, payload: value as UpdateState[k] });
      dispatch({ type: "hasBadWords" as k, payload: hasBadWords as UpdateState[k] });
    } else {
      dispatch({ type: key, payload: value });
    }
  };

  return { state, updateState };
};
