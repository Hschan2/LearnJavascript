import { FollowerProps, FollowingProps } from "../../tweet/types/tweet-type";

export interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: FollowingProps[] | FollowerProps[];
}
