import { useNavigate } from "react-router";
import { useNotification } from "./useNotification";
import { NotificationType } from "../types/notifications";

export const useNotificationAction = () => {
  const { markAllAsRead, deleteNotification } = useNotification();
  const navigate = useNavigate();

  const notificationClick = (notification: NotificationType) => {
    if (notification.type === "follow") {
      navigate(`/user-tweets/${notification.senderId}`);
    } else {
      navigate(`/detail/${notification.tweetId}`);
    }
  };

  const isMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
  };

  return {
    notificationClick,
    isMarkAllAsRead,
    handleDeleteNotification,
  };
};
