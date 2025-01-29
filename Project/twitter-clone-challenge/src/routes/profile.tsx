import { useEffect } from "react";
import useFollow from "../hooks/useFollow";
import { useProfileActions } from "../hooks/useProfileActions";
import { ProfileUI } from "./components/ProfileUI";
import { auth } from "../firebase";

function Profile() {
  const {
    avatar,
    isEditingName,
    onAvatarChange,
    selectedMenu,
    setSelectedMenu,
    toggleNameEditor,
    triggerRef,
    tweets,
    user,
  } = useProfileActions();
  const {
    fetchFollowerCount,
    fetchFollowingCount,
    followerCount,
    followingCount,
  } = useFollow();

  useEffect(() => {
    fetchFollowerCount(auth.currentUser?.uid);
    fetchFollowingCount(auth.currentUser?.uid);
  });

  return (
    <ProfileUI
      avatar={avatar}
      onAvatarChange={onAvatarChange}
      isEditingName={isEditingName}
      toggleNameEditor={toggleNameEditor}
      user={user}
      selectedMenu={selectedMenu}
      setSelectedMenu={setSelectedMenu}
      tweets={tweets}
      triggerRef={triggerRef}
      followingCount={followingCount}
      followerCount={followerCount}
    />
  );
}

export default Profile;
