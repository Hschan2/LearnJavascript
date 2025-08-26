import { useState, useEffect, useCallback } from "react";
import Tweet from "./tweet";
import { TimelineWrapper } from "../styles/timeline-components";
import { ITimeline, ITweet } from "../types/tweet-type";
import useInfiniteScroll from "../../../shared/hook/useInfiniteScroll";
import { addFirestoreUnsubscribe } from "../../../lib/firestoreSubscriptions";
import { createTweetsQuery, fetchTweetsRealtime, filterTweetsByOption } from "../../../services/tweetService";

function Timeline({ isHot, option = "전체" }: ITimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<ITweet[]>([]);
  const [_, triggerRef] = useInfiniteScroll(fetchMoreTweets);

  const fetchTweets = useCallback(() => {
    const tweetsQuery = createTweetsQuery({ isHot });

    const unsubscribe = fetchTweetsRealtime(tweetsQuery, (fetchedTweets) => {
      setTweets(fetchedTweets);
      setFilteredTweets(filterTweetsByOption(fetchedTweets, option));
    });

    addFirestoreUnsubscribe(unsubscribe);

    return unsubscribe;
  }, [isHot, option]);

  async function fetchMoreTweets(): Promise<void> {
    fetchTweets();
  }

  useEffect(() => {
    const unsubscribe = fetchTweets();
    return unsubscribe;
  }, [fetchTweets]);

  useEffect(() => {
    setFilteredTweets(filterTweetsByOption(tweets, option));
  }, [option, tweets]);

  return (
    <TimelineWrapper>
      {filteredTweets.map((tweet) => (
        <Tweet key={tweet.id} tweetObj={tweet} />
      ))}
      <div ref={triggerRef}></div>
    </TimelineWrapper>
  );
}

export default Timeline;
