import { useParams } from "react-router";
import useProfileFetchTweet from "../hooks/tweet/useProfileFetchTweet";
import Tweet from "../components/utils/tweet";
import {
  FollowWrapper,
  UserAvatar,
  UserName,
  UserWrapper,
  Wrapper,
} from "../components/style/timeline-components";

function UserTweets() {
  const { userId } = useParams();
  const { tweets, triggerRef, hasMore, userProfile } =
    useProfileFetchTweet(userId);

  return (
    <FollowWrapper>
      <UserWrapper>
        <UserAvatar src={userProfile?.image} alt={userProfile?.name} />
        <UserName>{userProfile?.name}</UserName>
      </UserWrapper>
      <Wrapper className="followUser-tweets">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} />
        ))}
        {hasMore && <div ref={triggerRef}></div>}
      </Wrapper>
    </FollowWrapper>
  );
}

export default UserTweets;
