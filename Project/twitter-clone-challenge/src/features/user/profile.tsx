import { useEffect, useState } from "react";
import useFollow from "./hooks/useFollow";
import { useProfileActions } from "./hooks/useProfileActions";
import { ProfileUI } from "./components/ProfileUI";
import { auth } from "../../firebase";

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
  const { fetchFollowerData, fetchFollowingData, followerData, followingData } =
    useFollow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"following" | "follower" | null>(
    null
  );

  const openModal = (type: "following" | "follower") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  useEffect(() => {
    fetchFollowerData(auth.currentUser?.uid);
    fetchFollowingData(auth.currentUser?.uid);
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
      followingData={followingData}
      followerData={followerData}
      isModalOpen={isModalOpen}
      modalType={modalType}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
}

export default Profile;
