import { NotificationType } from "../types/notifications";

export const formatNotificationMessage = (
  notification: NotificationType
): string => {
  return notification.type === "follow"
    ? `${notification.senderName}님이 팔로우하였습니다.`
    : `${notification.senderName}님이 ${notification.tweetTitle}에 좋아요를 눌렀습니다.`;
};
