import { User } from "firebase/auth";
import {
  FollowerProps,
  FollowingProps,
  ITweet,
} from "../../tweet/types/tweet-type";

export interface NameEditorProps {
  isEditing: boolean;
  user: any;
  toggleEditor: () => void;
}

export interface ProfileAvatarProps {
  avatar: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProfileMenuProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export interface ProfileUIProps {
  user: User | null;
  avatar: string;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tweets: ITweet[];
  triggerRef: ((node: HTMLDivElement | null) => void) | null;
  isEditingName: boolean;
  toggleNameEditor: () => void;
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  followingData: FollowingProps[];
  followerData: FollowerProps[];
  isModalOpen: boolean;
  modalType: "following" | "follower" | null;
  openModal: (type: "following" | "follower") => void;
  closeModal: () => void;
}
