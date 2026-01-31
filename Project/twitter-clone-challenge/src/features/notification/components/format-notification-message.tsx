import { SERVICE_MESSAGE } from "../../../message";
import { NotificationType } from "../types/notifications";

export const formatNotificationMessage = (
  notification: NotificationType
): string => {
  if (notification.type === "follow") {
    return SERVICE_MESSAGE.FOLLOW_NOTIFICATION(notification.senderName);
  } else if (notification.type === "like") {
    return SERVICE_MESSAGE.LIKE_NOTIFICATION(
      notification.senderName,
      notification.tweetTitle
    );
  } else if (notification.type === "comment") {
    return SERVICE_MESSAGE.COMMENT_NOTIFICATION(
      notification.senderName,
      notification.tweetTitle
    );
  }
  return SERVICE_MESSAGE.NEW_NOTIFICATION;
};
