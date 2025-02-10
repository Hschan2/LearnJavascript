import { User } from "firebase/auth";
import {
  FollowerProps,
  FollowingProps,
  ITweet,
} from "../../../components/types/tweet-type";
import NameEditor from "../../../components/utils/name-editor";
import ProfileAvatar from "../../../components/utils/profile-avatar";
import ProfileMenus from "../../../components/utils/profile-menu";
import Tweet from "../../../components/utils/tweet";
import Like from "../../tweet/like";
import Settings from "../../setting/settings";
import {
  ContentWrapper,
  FollowContainer,
  FollowInformation,
  Tweets,
  Wrapper,
} from "../style/profile-components";
import Modal from "./Modal";

interface ProfileUIProps {
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

export function ProfileUI({
  user,
  avatar,
  onAvatarChange,
  tweets,
  triggerRef,
  isEditingName,
  toggleNameEditor,
  selectedMenu,
  setSelectedMenu,
  followingData,
  followerData,
  isModalOpen,
  modalType,
  openModal,
  closeModal,
}: ProfileUIProps) {
  return (
    <Wrapper>
      <ContentWrapper>
        <ProfileAvatar avatar={avatar} onAvatarChange={onAvatarChange} />
        <NameEditor
          isEditing={isEditingName}
          user={user}
          toggleEditor={toggleNameEditor}
        />
        <FollowContainer>
          <FollowInformation onClick={() => openModal("following")}>
            팔로잉 {followingData.length}
          </FollowInformation>
          <FollowInformation onClick={() => openModal("follower")}>
            팔로워 {followerData.length}
          </FollowInformation>
        </FollowContainer>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalType === "following" ? "팔로잉" : "팔로워"}
          data={modalType === "following" ? followingData : followerData}
        />
        <ProfileMenus
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        {selectedMenu === "tweet" && (
          <Tweets>
            {tweets.map((tweet: ITweet, index: number) => (
              <Tweet key={`${tweet.id}-${index}`} tweetObj={tweet} />
            ))}
            {tweets.length > 0 && <div ref={triggerRef}></div>}
            {tweets.length === 0 && <p>더 이상 가져올 Tweet이 없습니다.</p>}
          </Tweets>
        )}
        {selectedMenu === "like" && <Like />}
        {selectedMenu === "setting" && <Settings />}
      </ContentWrapper>
    </Wrapper>
  );
}
