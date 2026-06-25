import { useState, useEffect, useCallback, useRef } from "react";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Tweet from "./tweet";
import { TimelineWrapper } from "../styles/timeline-components";
import { ITimeline, ITweet } from "../types/tweet-type";
import useInfiniteScroll from "../../../shared/hook/useInfiniteScroll";
import { createTweetsQuery, fetchTweetsOnce, fetchTweetsRealtime, filterTweetsByOption } from "../../../services/tweetService";

const PAGE_SIZE = 20;

function Timeline({ isHot, option = "전체" }: ITimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<ITweet[]>([]);
  const lastDocRef = useRef<QueryDocumentSnapshot<ITweet> | null>(null);
  const hasMoreRef = useRef(true);
  const isLoadingMoreRef = useRef(false);
  const hasLoadedMoreRef = useRef(false);

  const fetchTweets = useCallback(() => {
    lastDocRef.current = null;
    hasMoreRef.current = true;
    hasLoadedMoreRef.current = false;

    const tweetsQuery = createTweetsQuery({ isHot, limitCount: PAGE_SIZE });

    const unsubscribe = fetchTweetsRealtime(tweetsQuery, (fetchedTweets, lastDoc) => {
      lastDocRef.current = lastDoc;
      hasMoreRef.current = fetchedTweets.length === PAGE_SIZE;
      setTweets((prevTweets) => {
        if (!hasLoadedMoreRef.current) {
          return fetchedTweets;
        }

        const realtimeTweetIds = new Set(fetchedTweets.map((tweet) => tweet.id));
        const olderTweets = prevTweets.filter((tweet) => !realtimeTweetIds.has(tweet.id));
        return [...fetchedTweets, ...olderTweets];
      });
    });

    return unsubscribe;
  }, [isHot]);

  const fetchMoreTweets = useCallback(async (): Promise<void> => {
    if (!hasMoreRef.current || isLoadingMoreRef.current || !lastDocRef.current) {
      return;
    }

    isLoadingMoreRef.current = true;
    try {
      const tweetsQuery = createTweetsQuery({
        isHot,
        lastDoc: lastDocRef.current,
        limitCount: PAGE_SIZE,
      });
      const { tweets: nextTweets, lastDoc } = await fetchTweetsOnce(tweetsQuery);

      if (lastDoc) {
        lastDocRef.current = lastDoc;
      }
      if (nextTweets.length < PAGE_SIZE) {
        hasMoreRef.current = false;
      }

      setTweets((prevTweets) => {
        const tweetMap = new Map(prevTweets.map((tweet) => [tweet.id, tweet]));
        nextTweets.forEach((tweet) => tweetMap.set(tweet.id, tweet));
        hasLoadedMoreRef.current = true;
        return Array.from(tweetMap.values());
      });
    } finally {
      isLoadingMoreRef.current = false;
    }
  }, [isHot]);

  const [_, triggerRef] = useInfiniteScroll(fetchMoreTweets);

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
