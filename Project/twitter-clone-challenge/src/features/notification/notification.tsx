import { NotificationsWrapper } from "./styles/notifications-components";
import { useNotificationAction } from "./hooks/useNotificationAction";
import { NotificationList } from "./components/notification-contents";

function Notification() {
  const { notifications, handleNotificationClick, deleteNotification } =
    useNotificationAction();

  return (
    <NotificationsWrapper>
      <NotificationList
        notifications={notifications}
        onClick={handleNotificationClick}
        onDelete={deleteNotification}
      />
    </NotificationsWrapper>
  );
}

export default Notification;
