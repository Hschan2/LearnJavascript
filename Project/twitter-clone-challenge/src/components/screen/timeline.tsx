import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { dataBase } from "../../firebase";
import Tweet from "../utils/tweet";
import { Unsubscribe } from "firebase/auth";
import { Wrapper } from "../style/timeline-components";
import { ITimeline, ITweet } from "../types/tweet-type";

function Timeline({ isHot }: ITimeline) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const oneMonth = Date.now() - 30 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const orderBys = isHot
        ? [orderBy("createdAt"), orderBy("likes", "desc")]
        : [orderBy("createdAt", "desc")];
      const whereClause = isHot
        ? where("createdAt", ">=", oneMonth)
        : where("createdAt", ">", 0);

      const tweetsQuery = query(
        collection(dataBase, "tweets"),
        ...orderBys,
        whereClause,
        limit(25)
      );
      /* const spanShot = await getDocs(tweetsQuery);
        const tweets = spanShot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        }); */
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo, likes } =
            doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
            likes,
          };
        });

        if (isHot) {
          const sortedTweets = tweets.sort((a, b) =>
            b.likes !== a.likes ? b.likes - a.likes : b.createdAt - a.createdAt
          );
          setTweets(sortedTweets);
        } else {
          setTweets(tweets);
        }
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

export default Timeline;
