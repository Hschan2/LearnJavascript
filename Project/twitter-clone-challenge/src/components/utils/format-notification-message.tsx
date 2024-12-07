import { NotificationType } from "../types/notifications";

export const formatNotificationMessage = (
  notification: NotificationType
): string => {
  const action =
    notification.type === "like"
      ? "좋아요를 눌렀습니다."
      : "댓글을 작성했습니다.";
  return `${notification.senderName}님이 ${notification.tweetTitle}에 ${action}`;
};
