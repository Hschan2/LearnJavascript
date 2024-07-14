export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  likes: number;
  likedBy?: string[];
  exclamation: number;
  exclamationBy?: string[];
  tags: string[];
}

export interface ITimeline {
  isHot?: boolean;
}
