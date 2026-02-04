import { useNavigate } from "react-router";
import { useNotificationStore } from "../store/notificationStore";
import { NotificationType } from "../types/notifications";
import { useCallback, useEffect } from "react";
import { auth } from "../../../firebase";
import { where } from "firebase/firestore";
import { deleteDocument, getDocuments, updateDocument } from "../../../services/databaseService";
import { messages, formatMessage } from "../../../message";

export const useNotificationAction = () => {
  const { notifications } = useNotificationStore();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    const unreadDocs = await getDocuments(
      ["notifications"],
      where("recipientId", "==", user.uid),
      where("isRead", "==", false)
    );

    const updatePromises = unreadDocs.docs.map((docSnapshot) =>
      updateDocument(["notifications", docSnapshot.id], {
        isRead: true,
      })
    );

    await Promise.all(updatePromises);
  }, [user]);

  const deleteNotification = async (notificationId: string) => {
    try {
      await deleteDocument(["notifications", notificationId]);
      console.log(messages.serviceSuccess.deleteAlarm);
    } catch (error) {
      console.error(
        formatMessage(messages.serviceError.failedDeleteNotification, {
          errorMessage: (error as Error).message,
        })
      );
    }
  };

  const handleNotificationClick = (notification: NotificationType) => {
    if (notification.type === "follow") {
      navigate(`/user-tweets/${notification.senderId}`);
    } else {
      navigate(`/detail/${notification.tweetId}`);
    }
  };

  useEffect(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  return {
    notifications,
    handleNotificationClick,
    deleteNotification,
  };
};
