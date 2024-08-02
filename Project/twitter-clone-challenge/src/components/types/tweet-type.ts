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
}

export interface ITimeline {
  isHot?: boolean;
  option?: string | undefined;
}
