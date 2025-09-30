export interface NotificationType {
  id: string;
  recipientId: string;
  tweetTitle: string;
  tweetId: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  type: "like" | "follow" | "comment" | "other";
  isRead: boolean;
}

export interface NotificationListProps {
  notifications: NotificationType[];
  onClick: (notification: NotificationType) => void;
  onDelete: (id: string) => void;
}