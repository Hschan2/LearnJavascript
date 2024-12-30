import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { dataBase } from "../../firebase";
import Tweet from "../utils/tweet";
import { Wrapper } from "../style/timeline-components";
import { ITimeline, ITweet } from "../types/tweet-type";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const getTweetData = (doc: QueryDocumentSnapshot): ITweet => {
  const data = doc.data() as ITweet;
  return {
    ...data,
    id: doc.id,
  };
};

const filterTweetsByOption = (tweets: ITweet[], option: string) =>
  option === "전체" ? tweets : tweets.filter((tweet) => tweet.item === option);

const fetchTweetData = (snapshot: QuerySnapshot): ITweet[] =>
  snapshot.docs.map(getTweetData);

function Timeline({ isHot, option = "전체" }: ITimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<ITweet[]>([]);
  const [_, triggerRef] = useInfiniteScroll(fetchMoreTweets);

  const fetchTweets = useCallback(() => {
    const tweetsQuery = query(
      collection(dataBase, "tweets"),
      ...getOrderBys(isHot)
    );

    return onSnapshot(tweetsQuery, (snapshot) => {
      const fetchedTweets = fetchTweetData(snapshot);
      setTweets(fetchedTweets);
      setFilteredTweets(filterTweetsByOption(fetchedTweets, option));
    });
  }, [isHot, option]);

  const getOrderBys = (isHot: boolean | undefined) => {
    if (isHot) {
      return [orderBy("likes", "desc"), orderBy("createdAt", "desc")];
    }
    return [orderBy("createdAt", "desc")];
  };

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
    <Wrapper>
      {filteredTweets.map((tweet) => (
        <Tweet key={tweet.id} tweetObj={tweet} />
      ))}
      <div ref={triggerRef}></div>
    </Wrapper>
  );
}

export default Timeline;
