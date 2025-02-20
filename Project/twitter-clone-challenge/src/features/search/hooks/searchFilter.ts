import { ITweet } from "../../tweet/types/tweet-type";

export const filterTweetsByKeyword = (tweets: ITweet[], keyword: string) => {
  return tweets.filter(
    (tweet) =>
      tweet.tweet.includes(keyword) ||
      tweet.tags?.some((tag) => tag.includes(keyword))
  );
};
