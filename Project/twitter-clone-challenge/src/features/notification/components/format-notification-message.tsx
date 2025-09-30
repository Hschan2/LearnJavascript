import { NotificationType } from "../types/notifications";

export const formatNotificationMessage = (
  notification: NotificationType
): string => {
  if (notification.type === "follow") {
    return `${notification.senderName}님이 팔로우하였습니다.`;
  } else if (notification.type === "like") {
    return `${notification.senderName}님이 ${notification.tweetTitle}에 좋아요를 눌렀습니다.`;
  } else if (notification.type === "comment") {
    return `${notification.senderName}님이 ${notification.tweetTitle}에 댓글을 작성했습니다.`;
  }
  return "새로운 알림이 있습니다.";
};
