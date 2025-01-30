import {
  FollowingProps,
  FollowerProps,
} from "../../components/types/tweet-type";
import {
  Avatar,
  CloseButton,
  FollowItem,
  FollowList,
  Header,
  ModalContainer,
  Overlay,
  Title,
} from "../style/profile-components";

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: FollowingProps[] | FollowerProps[];
}

function Modal({ isOpen, onClose, title, data }: FollowModalProps) {
  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <FollowList>
          {data.length > 0 &&
            data.map((follow) => (
              <FollowItem key={follow.id}>
                <Avatar
                  src={
                    "followingPhoto" in follow
                      ? follow.followingPhoto
                      : follow.followerPhoto
                  }
                  alt={
                    "followingName" in follow
                      ? follow.followingName
                      : follow.followerName
                  }
                  loading="lazy"
                />
                <span>
                  {"followingName" in follow
                    ? follow.followingName
                    : follow.followerName}
                </span>
              </FollowItem>
            ))}
        </FollowList>
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
