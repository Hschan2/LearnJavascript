import Tweet from "../../tweet/components/tweet";
import { ITweet } from "../../tweet/types/tweet-type";
import { Wrapper } from "../../tweet/styles/timeline-components";

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
