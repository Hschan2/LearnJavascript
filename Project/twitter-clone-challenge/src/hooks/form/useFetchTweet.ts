import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dataBase } from "../../firebase";

interface TweetData {
  tweet: string;
  photo?: string | null;
  tags: string[];
  item: string;
  location: string;
}

export const useFetchTweet = (
  tweetId: string,
  onFetched: (data: TweetData) => void
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTweetData = async () => {
    setLoading(true);
    setError(null);
    try {
      const tweetDoc = await getDoc(doc(dataBase, "tweets", tweetId));
      if (tweetDoc.exists()) {
        const tweetData = tweetDoc.data() as TweetData;
        onFetched(tweetData);
      } else {
        console.error("Tweet이 없습니다.");
      }
    } catch (err) {
      console.error("Tweet 수정 실패: ", err);
      setError("Tweet 수정에 실패하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tweetId) fetchTweetData();
  }, [tweetId]);

  return { loading, error, fetchTweetData };
};
