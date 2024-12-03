import { useState, useCallback } from "react";
import { auth } from "../firebase";

import Tweet from "../components/utils/tweet";
import { ContentWrapper, Tweets, Wrapper } from "./style/profile-components";
import Like from "./like";
import Settings from "./settings";
import useProfileFetchTweet from "../hooks/tweet/useProfileFetchTweet";
import useAvatarUpload from "../hooks/auth/useAvatarUpload";
import NameEditor from "../components/utils/name-editor";
import ProfileMenus from "../components/utils/profile-menu";
import ProfileAvatar from "../components/utils/profile-avatar";

function Profile() {
  const user = auth.currentUser;
  const { tweets, fetchTweets, triggerRef } = useProfileFetchTweet(user?.uid);
  const { avatar, onAvatarChange } = useAvatarUpload(user);

  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("tweet");

  const toggleNameEditor = useCallback(() => {
    setIsEditingName((prev) => !prev);
  }, []);

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
            {tweets.map((tweet, index) => (
              <Tweet
                key={`${tweet.id}-${index}`}
                tweetObj={tweet}
              />
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

export default Profile;
