import { useParams } from "react-router";
import useProfileFetchTweet from "../hooks/tweet/useProfileFetchTweet";
import { Wrapper } from "../components/style/timeline-components";
import Tweet from "../components/utils/tweet";

function UserTweets() {
  const { userId } = useParams();
  const { tweets, triggerRef, hasMore } = useProfileFetchTweet(userId);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweetObj={tweet} />
      ))}
      {hasMore && <div ref={triggerRef}></div>}
    </Wrapper>
  );
}

export default UserTweets;
