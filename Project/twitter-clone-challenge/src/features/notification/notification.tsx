import { useEffect } from "react";
import { NotificationsWrapper } from "./styles/notifications-components";
import { useNotification } from "./hooks/useNotification";
import { useNotificationAction } from "./hooks/useNotificationAction";
import { NotificationList } from "./components/NotificationList";

function Notification() {
  const { notifications } = useNotification();
  const { notificationClick, isMarkAllAsRead, handleDeleteNotification } =
    useNotificationAction();

  useEffect(() => {
    isMarkAllAsRead();
  }, [isMarkAllAsRead]);

  return (
    <NotificationsWrapper>
      <NotificationList
        notifications={notifications}
        onClick={notificationClick}
        onDelete={handleDeleteNotification}
      />
    </NotificationsWrapper>
  );
}

export default Notification;
