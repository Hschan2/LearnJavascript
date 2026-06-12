import { collection, query, orderBy, where, startAfter, getDocs, onSnapshot, QuerySnapshot, QueryDocumentSnapshot, Query } from 'firebase/firestore';
import { dataBase } from '../firebase';
import { ITweet } from '../features/tweet/types/tweet-type';
import { tweetConverter } from '../lib/converters';

export const filterTweetsByOption = (tweets: ITweet[], option: string) => {
  if (option === "전체") {
    return tweets;
  }
  return tweets.filter((tweet) => tweet.item === option);
};

export const createTweetsQuery = (options: { isHot?: boolean; userId?: string; lastDoc?: QueryDocumentSnapshot<ITweet> | null; }) => {
  const { isHot, userId, lastDoc } = options;
  let q = query(collection(dataBase, "tweets").withConverter(tweetConverter));

  if (userId) {
    q = query(q, where("userId", "==", userId));
  }

  if (isHot) {
    q = query(q, orderBy("likes", "desc"));
  }
  q = query(q, orderBy("createdAt", "desc"));

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  return q;
};

export const fetchTweetsRealtime = (query: Query<ITweet>, callback: (tweets: ITweet[]) => void) => {
  return onSnapshot(query, (snapshot: QuerySnapshot<ITweet>) => {
    const tweets = snapshot.docs.map(doc => doc.data());
    callback(tweets);
  });
};

export const fetchTweetsOnce = async (query: Query<ITweet>): Promise<{ tweets: ITweet[], lastDoc: QueryDocumentSnapshot<ITweet> | null }> => {
  const snapshot: QuerySnapshot<ITweet> = await getDocs(query);
  const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
  return {
    tweets: snapshot.docs.map(doc => doc.data()),
    lastDoc,
  };
};
