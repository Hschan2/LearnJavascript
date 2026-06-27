import { useState, useEffect, useCallback, useRef } from "react";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Tweet from "./tweet";
import { TimelineWrapper } from "../styles/timeline-components";
import { ITimeline, ITweet } from "../types/tweet-type";
import useInfiniteScroll from "../../../shared/hook/useInfiniteScroll";
import {
  createTweetsQuery,
  fetchTweetsOnce,
  filterTweetsByOption,
} from "../../../services/tweetService";
import { PAGE_SIZE } from "../../../constants";

function Timeline({ isHot, option = "전체" }: ITimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<ITweet[]>([]);
  const lastDocRef = useRef<QueryDocumentSnapshot<ITweet> | null>(null);
  const hasMoreRef = useRef(true);
  const isLoadingMoreRef = useRef(false);
  const requestIdRef = useRef(0);

  const fetchTweets = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    lastDocRef.current = null;
    hasMoreRef.current = true;

    const tweetsQuery = createTweetsQuery({ isHot, limitCount: PAGE_SIZE });

    const { tweets: fetchedTweets, lastDoc } = await fetchTweetsOnce(
      tweetsQuery
    );
    if (requestIdRef.current === requestId) {
      lastDocRef.current = lastDoc;
      hasMoreRef.current = fetchedTweets.length === PAGE_SIZE;
      setTweets(fetchedTweets);
    }
  }, [isHot]);

  const fetchMoreTweets = useCallback(async (): Promise<void> => {
    if (
      !hasMoreRef.current ||
      isLoadingMoreRef.current ||
      !lastDocRef.current
    ) {
      return;
    }

    isLoadingMoreRef.current = true;
    const requestId = requestIdRef.current;
    try {
      const tweetsQuery = createTweetsQuery({
        isHot,
        lastDoc: lastDocRef.current,
        limitCount: PAGE_SIZE,
      });
      const { tweets: nextTweets, lastDoc } = await fetchTweetsOnce(
        tweetsQuery
      );

      if (requestIdRef.current !== requestId) {
        return;
      }

      if (lastDoc) {
        lastDocRef.current = lastDoc;
      }
      if (nextTweets.length < PAGE_SIZE) {
        hasMoreRef.current = false;
      }

      setTweets((prevTweets) => {
        const tweetMap = new Map(prevTweets.map((tweet) => [tweet.id, tweet]));
        nextTweets.forEach((tweet) => tweetMap.set(tweet.id, tweet));
        return Array.from(tweetMap.values());
      });
    } finally {
      isLoadingMoreRef.current = false;
    }
  }, [isHot]);

  const [_, triggerRef] = useInfiniteScroll(fetchMoreTweets);

  useEffect(() => {
    fetchTweets();
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
