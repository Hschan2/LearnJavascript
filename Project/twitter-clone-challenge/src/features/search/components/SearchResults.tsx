import Tweet from "../../tweet/components/tweet";
import { Wrapper } from "../../tweet/styles/timeline-components";
import { SearchResultsProps } from "../types/search-type";

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
