import { User } from "firebase/auth";
import {
  FollowerProps,
  FollowingProps,
  ITweet,
} from "../../tweet/types/tweet-type";

export interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: FollowingProps[] | FollowerProps[];
}

export interface NameEditorProps {
  isEditing: boolean;
  user: User | null;
  toggleEditor: () => void;
}

export interface ProfileAvatarProps {
  avatar: string | null | undefined;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProfileMenuProps {
  selectedMenu: string;
  setSelectedMenu: (menu: "tweet" | "like" | "setting") => void;
}

export interface ProfileUIProps {
  user: User | null;
  avatar: string | null | undefined;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tweets: ITweet[];
  triggerRef: ((node: HTMLDivElement | null) => void) | null;
  isEditingName: boolean;
  toggleNameEditor: () => void;
  selectedMenu: string;
  setSelectedMenu: (menu: "tweet" | "like" | "setting") => void;
  followingData: FollowingProps[];
  followerData: FollowerProps[];
  isModalOpen: boolean;
  modalType: "following" | "follower" | null;
  openModal: (type: "following" | "follower") => void;
  closeModal: () => void;
}
