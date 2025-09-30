import { toast } from "react-hot-toast";
import { formatNotificationMessage } from "./format-notification-message";
import { NotificationType } from "../types/notifications";
import {
  CloseButton,
  Message,
  NotificationWrapper,
} from "../styles/realtime-notification-components";

interface RealtimeNotificationProps {
  notification: NotificationType;
  t: { id: string };
}

export const RealtimeNotification = ({ notification, t }: RealtimeNotificationProps) => {
  const message = formatNotificationMessage(notification);

  return (
    <NotificationWrapper>
      <Message>{message}</Message>
      <CloseButton onClick={() => toast.dismiss(t.id)}>&times;</CloseButton>
    </NotificationWrapper>
  );
};
