import { messages } from "../../../message";
import { NotificationType } from "../types/notifications";

export const formatNotificationMessage = (
  notification: NotificationType
): string => {
  if (notification.type === "follow") {
    return messages.serviceMessage.followNotification(notification.senderName);
  } else if (notification.type === "like") {
    return messages.serviceMessage.likeNotification(
      notification.senderName,
      notification.tweetTitle
    );
  } else if (notification.type === "comment") {
    return messages.serviceMessage.commentNotification(
      notification.senderName,
      notification.tweetTitle
    );
  }
  return messages.serviceMessage.newNotification;
};
