import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ITweet, IReply, FollowingProps, FollowerProps } from "../features/tweet/types/tweet-type";
import { NotificationType } from "../features/notification/types/notifications";
import { IUser } from "../features/user/types/user-type";

const convertTimestamp = (timestamp: Timestamp | number | undefined): number => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toMillis();
  }
  return typeof timestamp === "number" ? timestamp : Date.now();
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
    const data = snapshot.data(options);
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
    const data = snapshot.data(options);
    return {
      ...data,
      replyId: snapshot.id,
      createdAt: convertTimestamp(data.createdAt),
    } as IReply;
  },
};

export const userConverter: FirestoreDataConverter<IUser> = {
  toFirestore(user: IUser): DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): IUser {
    const data = snapshot.data(options);
    return {
      ...data,
      uid: snapshot.id,
      createdAt: convertTimestamp(data.createdAt),
    } as IUser;
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
