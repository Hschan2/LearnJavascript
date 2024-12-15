import { useProfileActions } from "../hooks/useProfileActions";
import { ProfileUI } from "./components/ProfileUI";

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
    />
  );
}

export default Profile;
