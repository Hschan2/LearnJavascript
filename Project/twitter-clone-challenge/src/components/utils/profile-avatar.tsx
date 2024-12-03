import {
  AvatarImg,
  AvatarInput,
  AvatarUpload,
} from "../../routes/style/profile-components";

interface ProfileMenuProps {
  avatar: string | null | undefined;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileAvatar = ({ avatar, onAvatarChange }: ProfileMenuProps) => {
  return (
    <>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} alt="프로필 이미지" />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
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
