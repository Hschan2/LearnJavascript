import Tweet from "../../../components/utils/tweet";
import { ITweet } from "../../../components/types/tweet-type";
import { Wrapper } from "../../../components/style/timeline-components";

interface SearchResultsProps {
  tweets: ITweet[];
}

export const SearchResults = ({ tweets }: SearchResultsProps) => (
  <>
    {tweets.length > 0 && (
      <Wrapper>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} />
        ))}
      </Wrapper>
    )}
  </>
);
