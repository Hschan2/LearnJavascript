export interface IComment {
  commentId: string;
  commentText: string;
  commenterId: string;
  commenterName: string;
  commenterProfile: string;
  createdAt: number;
  likeCount?: number;
  likedBy?: string[];
  replyCount?: number;
}

export interface IReply {
  replyId: string;
  commentId: string;
  replyText: string;
  replierId: string;
  replierName: string;
  replierProfile: string;
  createdAt: number;
  likes?: number;
  likedBy?: string[];
}

export interface ITweet {
  id: string;
  photo?: string;
  retouch?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  likes: number;
  likedBy?: string[];
  exclamation: number;
  exclamationBy?: string[];
  tags?: string[];
  item: string;
  comments?: IComment[];
  location?: string;
  followingId?: string;
  followerId?: string;
}

export interface ITimeline {
  isHot?: boolean;
  option?: string | undefined;
}

// Follow
export interface FollowingProps {
  id: string;
  followingId: string;
  followingName: string;
  followingPhoto: string;
  isFollowing: boolean;
  createdAt: number;
}

export interface FollowerProps {
  id: string;
  followerId: string;
  followerName: string;
  followerPhoto: string;
  createdAt: number;
}