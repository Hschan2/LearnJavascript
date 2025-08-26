import { collection, query, orderBy, where, startAfter, getDocs, onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { dataBase } from '../firebase';
import { ITweet } from '../features/tweet/types/tweet-type';

// Firestore에서 트윗 데이터를 가져와 ITweet 형식으로 변환합니다.
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

// QuerySnapshot을 ITweet 배열로 변환합니다.
export const mapSnapshotToTweets = (snapshot: QuerySnapshot): ITweet[] => {
  return snapshot.docs.map(getTweetData);
};

// 옵션에 따라 트윗을 필터링합니다.
export const filterTweetsByOption = (tweets: ITweet[], option: string) => {
  if (option === "전체") {
    return tweets;
  }
  return tweets.filter((tweet) => tweet.item === option);
};

// 트윗 쿼리를 생성합니다.
export const createTweetsQuery = (options: { isHot?: boolean; userId?: string; lastDoc?: any; }) => {
  const { isHot, userId, lastDoc } = options;
  let q = query(collection(dataBase, "tweets"));

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

// 실시간으로 트윗을 가져옵니다.
export const fetchTweetsRealtime = (query: any, callback: (tweets: ITweet[]) => void) => {
  return onSnapshot(query, (snapshot) => {
    const tweets = mapSnapshotToTweets(snapshot);
    callback(tweets);
  });
};

// 한 번만 트윗을 가져옵니다.
export const fetchTweetsOnce = async (query: any) => {
  const snapshot = await getDocs(query);
  return {
    tweets: mapSnapshotToTweets(snapshot),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
  };
};
