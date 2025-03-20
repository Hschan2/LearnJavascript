import { useNavigate } from "react-router";
import { Avatar, FollowItem, FollowList } from "../style/profile-components";
import { FollowModalProps } from "../types/modal-type";
import Modal from "../../../shared/modal";

function FollowModal({ isOpen, onClose, title, data }: FollowModalProps) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FollowList>
        {data.length > 0 &&
          data.map((follow) => (
            <FollowItem
              key={follow.id}
              onClick={() =>
                navigate(
                  `/user-tweets/${
                    "followingId" in follow
                      ? follow.followingId
                      : follow.followerId
                  }`
                )
              }
            >
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
    </Modal>
  );
}

export default FollowModal;
