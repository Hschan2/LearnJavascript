export interface NotificationType {
  id: string;
  recipientId: string;
  tweetTitle: string;
  tweetId: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  type: "like" | "follow" | "other";
  isRead: boolean;
}
