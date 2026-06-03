import { useReducer } from "react";
import { UpdateState } from "../types/form-type";
import { filterBadWords } from "../../../shared/filter-bad-words";

type Action<k extends keyof UpdateState> = { type: k; payload: UpdateState[k] };

const reducer = (state: UpdateState, action: Action<keyof UpdateState>) => ({
  ...state,
  [action.type]: action.payload,
});

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
  });

  const updateState = <k extends keyof UpdateState>(
    key: k,
    value: UpdateState[k]
  ) => {
    let finalValue = value;
    if ((key === "tweet" || key === "tagInput") && typeof value === "string") {
      finalValue = filterBadWords(value) as UpdateState[k];
    }
    dispatch({ type: key, payload: finalValue });
  };

  return { state, updateState };
};
