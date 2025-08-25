import { useCallback, useState } from "react";
import { auth } from "../../../firebase";
import useProfileFetchTweet from "./useProfileFetchTweet";
import { useAvatar } from "../../../shared/hook/useAvatar";

export function useProfileActions() {
  const user = auth.currentUser;
  const { tweets, triggerRef } = useProfileFetchTweet(user?.uid);
  const { avatar, onAvatarChange } = useAvatar({
    user,
    enableUpload: true,
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<
    "tweet" | "like" | "setting"
  >("tweet");

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
