import { ProfileMenuWrapper, ProfileMenu } from "../style/profile-components";
import { ProfileMenuProps } from "../types/profile-type";

const ProfileMenus = ({ selectedMenu, setSelectedMenu }: ProfileMenuProps) => {
  return (
    <ProfileMenuWrapper>
      <ProfileMenu
        $isSelected={selectedMenu === "tweet"}
        onClick={() => setSelectedMenu("tweet")}
      >
        Tweet
      </ProfileMenu>
      <ProfileMenu
        $isSelected={selectedMenu === "like"}
        onClick={() => setSelectedMenu("like")}
      >
        Like
      </ProfileMenu>
      <ProfileMenu
        $isSelected={selectedMenu === "setting"}
        onClick={() => setSelectedMenu("setting")}
      >
        Setting
      </ProfileMenu>
    </ProfileMenuWrapper>
  );
};

export default ProfileMenus;
