import { useParams } from "react-router";
import useProfileFetchTweet from "../user/hooks/useProfileFetchTweet";
import Tweet from "./components/tweet";
import {
  FollowWrapper,
  UserAvatar,
  UserName,
  UserWrapper,
  TimelineWrapper,
} from "./styles/timeline-components";

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
      <TimelineWrapper className="followUser-tweets">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} />
        ))}
        {hasMore && <div ref={triggerRef}></div>}
      </TimelineWrapper>
    </FollowWrapper>
  );
}

export default UserTweets;
