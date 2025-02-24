import { useEffect } from "react";
import { useFetchTweet } from "./useFetchTweet";
import { useUpdateTweetState } from "./useUpdateTweetState";

export const useUpdateFetchTweetData = (id: string) => {
  const { state, updateState } = useUpdateTweetState();
  const { fetchTweetData } = useFetchTweet(id, (data) => {
    updateState("tweet", data.tweet);
    updateState("file", data.photo || null);
    updateState("tags", data.tags);
    updateState("selectedOption", data.item);
    updateState("selectedAddress", data.location);
  });

  useEffect(() => {
    fetchTweetData();
  }, [id]);

  return { state, updateState };
};
