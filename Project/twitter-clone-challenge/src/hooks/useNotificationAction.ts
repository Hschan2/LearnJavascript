import { useNavigate } from "react-router";
import { useNotification } from "./useNotification";
import { NotificationType } from "../components/types/notifications";

export const useNotificationAction = () => {
  const { markAllAsRead, deleteNotification } = useNotification();
  const navigate = useNavigate();

  const notificationClick = (notification: NotificationType) => {
    navigate(`/detail/${notification.tweetId}`);
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
