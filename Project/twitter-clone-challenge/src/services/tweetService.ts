import { collection, query, orderBy, where, startAfter, getDocs, onSnapshot, QuerySnapshot, QueryDocumentSnapshot, Query, DocumentData } from 'firebase/firestore';
import { dataBase } from '../firebase';
import { ITweet } from '../features/tweet/types/tweet-type';

const getTweetData = (doc: QueryDocumentSnapshot): ITweet => {
  const data = doc.data();
  return {
    tweet: data.tweet,
    createdAt: data.createdAt,
    userId: data.userId,
    username: data.username,
    photo: data.photo,
    id: doc.id,
    likes: data.likes,
    likedBy: data.likedBy,
    comments: data.comments,
    item: data.item,
    exclamation: data.exclamation,
    exclamationBy: data.exclamationBy,
  };
};

export const mapSnapshotToTweets = (snapshot: QuerySnapshot<DocumentData>): ITweet[] => {
  return snapshot.docs.map(getTweetData);
};

export const filterTweetsByOption = (tweets: ITweet[], option: string) => {
  if (option === "전체") {
    return tweets;
  }
  return tweets.filter((tweet) => tweet.item === option);
};

export const createTweetsQuery = (options: { isHot?: boolean; userId?: string; lastDoc?: QueryDocumentSnapshot<DocumentData> | null; }) => {
  const { isHot, userId, lastDoc } = options;
  let q: Query = query(collection(dataBase, "tweets"));

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

export const fetchTweetsRealtime = (query: Query, callback: (tweets: ITweet[]) => void) => {
  return onSnapshot(query, (snapshot: QuerySnapshot<DocumentData>) => {
    const tweets = mapSnapshotToTweets(snapshot);
    callback(tweets);
  });
};

export const fetchTweetsOnce = async (query: Query): Promise<{ tweets: ITweet[], lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(query);
  const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
  return {
    tweets: mapSnapshotToTweets(snapshot),
    lastDoc,
  };
};
