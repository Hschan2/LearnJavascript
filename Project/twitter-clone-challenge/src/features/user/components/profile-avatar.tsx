import {
  AvatarImg,
  AvatarInput,
  AvatarUpload,
} from "../style/profile-components";
import { ProfileAvatarProps } from "../types/profile-type";

const ProfileAvatar = ({ avatar, onAvatarChange }: ProfileAvatarProps) => {
  return (
    <>
      <AvatarUpload htmlFor="avatar">
        <AvatarImg src={avatar} alt="프로필 이미지" />
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
        title="프로필 이미지 변경"
      />
    </>
  );
};

export default ProfileAvatar;
