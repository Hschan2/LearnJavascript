import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { ITweet, IReply, FollowingProps, FollowerProps } from "../features/tweet/types/tweet-type";
import { NotificationType } from "../features/notification/types/notifications";

const convertTimestamp = (timestamp: any): number => {
  if (timestamp && typeof timestamp.toMillis === "function") {
    return timestamp.toMillis();
  }
  return timestamp;
};

export const tweetConverter: FirestoreDataConverter<ITweet> = {
  toFirestore(tweet: ITweet): DocumentData {
    const { id, ...data } = tweet;
    return {
      ...data,
      createdAt: data.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ITweet {
    const data = snapshot.data(options)!;
    return {
      ...data,
      id: snapshot.id,
      createdAt: convertTimestamp(data.createdAt),
    } as ITweet;
  },
};

export const replyConverter: FirestoreDataConverter<IReply> = {
  toFirestore(reply: IReply): DocumentData {
    const { replyId, ...data } = reply;
    return {
      ...data,
      createdAt: data.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): IReply {
    const data = snapshot.data(options)!;
    return {
      ...data,
      replyId: snapshot.id,
      createdAt: convertTimestamp(data.createdAt),
    } as IReply;
  },
};

export const userConverter: FirestoreDataConverter<any> = {
  toFirestore(user: any): DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): any {
    const data = snapshot.data(options)!;
    return {
      ...data,
      uid: snapshot.id,
    };
  },
};

export const notificationConverter: FirestoreDataConverter<NotificationType> = {
  toFirestore(notification: NotificationType): DocumentData {
    const { id, ...data } = notification;
    return {
      ...data,
      createdAt: data.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): NotificationType {
    const data = snapshot.data(options)!;
    return {
      ...data,
      id: snapshot.id,
      createdAt: convertTimestamp(data.createdAt),
    } as NotificationType;
  },
};

export const followingConverter: FirestoreDataConverter<FollowingProps> = {
  toFirestore(following: FollowingProps): DocumentData {
    const { id, ...data } = following;
    return {
      ...data,
      createdAt: data.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): FollowingProps {
    const data = snapshot.data(options)!;
    return {
      ...data,
      id: snapshot.id,
      createdAt: convertTimestamp(data.createdAt),
    } as FollowingProps;
  },
};

export const followerConverter: FirestoreDataConverter<FollowerProps> = {
  toFirestore(follower: FollowerProps): DocumentData {
    const { id, ...data } = follower;
    return {
      ...data,
      createdAt: data.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): FollowerProps {
    const data = snapshot.data(options)!;
    return {
      ...data,
      id: snapshot.id,
      createdAt: convertTimestamp(data.createdAt),
    } as FollowerProps;
  },
};
