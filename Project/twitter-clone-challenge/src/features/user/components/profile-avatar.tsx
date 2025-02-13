import {
  AvatarImg,
  AvatarInput,
  AvatarUpload,
} from "../style/profile-components";

interface ProfileMenuProps {
  avatar: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileAvatar = ({ avatar, onAvatarChange }: ProfileMenuProps) => {
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
