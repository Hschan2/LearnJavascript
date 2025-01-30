export interface IComment {
  commentId: string;
  commentText: string;
  commenterId: string;
  commenterName: string;
  commenterProfile: string;
  createdAt: number;
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
}

export interface ITimeline {
  isHot?: boolean;
  option?: string | undefined;
}

// Follow
export interface FollowingProps {
  id: string;
  followingName: string;
  followingPhoto: string;
  isFollowing: boolean;
  createdAt: number;
}

export interface FollowerProps {
  id: string;
  followerName: string;
  followerPhoto: string;
  createdAt: number;
}