import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ITweet } from "../../tweet/types/tweet-type";
import { dataBase } from "../../../firebase";

export const subscribeToTweet = (
  searchWord: string,
  onUpdate: (filteredTweets: ITweet[]) => void
): (() => void) => {
  const tweetsQuery = query(
    collection(dataBase, "tweets"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
    const tweets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ITweet[];

    const filteredTweets = tweets.filter(
      (tweet) =>
        tweet.tweet.includes(searchWord) ||
        tweet.tags?.some((tag: string) => tag.includes(searchWord))
    );

    onUpdate(filteredTweets);
  });

  return unsubscribe;
};
