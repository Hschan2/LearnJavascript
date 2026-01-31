import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNotificationStore } from "../store/notificationStore";
import { RealtimeNotification } from "./realtime-notification";

export const NotificationToast = () => {
  const { latestNotification, setLatestNotification } = useNotificationStore();

  useEffect(() => {
    if (latestNotification) {
      toast.custom(
        (t) => <RealtimeNotification notification={latestNotification} t={t} />,
        { id: latestNotification.id }
      );

      setLatestNotification(null);
    }
  }, [latestNotification, setLatestNotification]);

  return null;
};
