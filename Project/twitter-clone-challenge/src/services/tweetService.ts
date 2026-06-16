import {
  query,
  orderBy,
  where,
  startAfter,
  QueryDocumentSnapshot,
  Query,
  collection,
  QueryConstraint,
} from "firebase/firestore";
import { dataBase } from "../firebase";
import { ITweet } from "../features/tweet/types/tweet-type";
import { tweetConverter } from "../lib/converters";
import { getDocumentsByQuery, subscribeToQuery } from "./databaseService";

/**
 * 트윗 필터링 (UI 로직 - 호환성을 위해 유지)
 */
export const filterTweetsByOption = (tweets: ITweet[], option: string) => {
  if (option === "전체") {
    return tweets;
  }
  return tweets.filter((tweet) => tweet.item === option);
};

/**
 * 트윗 쿼리 생성
 */
export const createTweetsQuery = (options: {
  isHot?: boolean;
  userId?: string;
  lastDoc?: QueryDocumentSnapshot<ITweet> | null;
}) => {
  const { isHot, userId, lastDoc } = options;
  const constraints: QueryConstraint[] = [];

  if (userId) {
    constraints.push(where("userId", "==", userId));
  }

  if (isHot) {
    constraints.push(orderBy("likes", "desc"));
  }

  constraints.push(orderBy("createdAt", "desc"));

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  return query(
    collection(dataBase, "tweets").withConverter(tweetConverter),
    ...constraints
  );
};

/**
 * 실시간 트윗 페칭 (databaseService 활용)
 */
export const fetchTweetsRealtime = (
  q: Query<ITweet>,
  callback: (tweets: ITweet[]) => void
) => {
  return subscribeToQuery(q, (snapshot) => {
    const tweets = snapshot.docs.map((doc) => doc.data());
    callback(tweets);
  });
};

/**
 * 트윗 1회성 페칭 (databaseService 활용)
 */
export const fetchTweetsOnce = async (
  q: Query<ITweet>
): Promise<{
  tweets: ITweet[];
  lastDoc: QueryDocumentSnapshot<ITweet> | null;
}> => {
  const snapshot = await getDocumentsByQuery(q);

  const lastDoc =
    snapshot.docs.length > 0
      ? snapshot.docs[snapshot.docs.length - 1]
      : null;

  return {
    tweets: snapshot.docs.map((doc) => doc.data()),
    lastDoc,
  };
};
