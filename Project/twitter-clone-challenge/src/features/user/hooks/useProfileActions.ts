import { useCallback, useState } from "react";
import { auth } from "../../../firebase";
import useAvatarUpload from "./useAvatarUpload";
import useProfileFetchTweet from "./useProfileFetchTweet";

export function useProfileActions() {
  const user = auth.currentUser;
  const { tweets, triggerRef } = useProfileFetchTweet(user?.uid);
  const { avatar, onAvatarChange } = useAvatarUpload(user);

  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("tweet");

  const toggleNameEditor = useCallback(() => {
    setIsEditingName((prev) => !prev);
  }, []);

  return {
    user,
    avatar,
    onAvatarChange,
    tweets,
    triggerRef,
    isEditingName,
    toggleNameEditor,
    selectedMenu,
    setSelectedMenu,
  };
}
