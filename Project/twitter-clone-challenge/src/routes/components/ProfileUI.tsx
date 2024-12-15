import { User } from "firebase/auth";
import { ITweet } from "../../components/types/tweet-type";
import NameEditor from "../../components/utils/name-editor";
import ProfileAvatar from "../../components/utils/profile-avatar";
import ProfileMenus from "../../components/utils/profile-menu";
import Tweet from "../../components/utils/tweet";
import Like from "../like";
import Settings from "../settings";
import { ContentWrapper, Tweets, Wrapper } from "../style/profile-components";

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
