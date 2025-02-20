import { useNavigate } from "react-router";
import { useNotification } from "./useNotification";
import { NotificationType } from "../types/notifications";
import { useCallback, useEffect } from "react";
import { auth, dataBase } from "../../../firebase";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export const useNotificationAction = () => {
  const { notifications } = useNotification();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    const unreadQuery = query(
      collection(dataBase, "notifications"),
      where("recipientId", "==", user.uid),
      where("isRead", "==", false)
    );

    const unreadDocs = await getDocs(unreadQuery);

    const updatePromises = unreadDocs.docs.map((docSnapshot) =>
      updateDoc(doc(dataBase, "notifications", docSnapshot.id), {
        isRead: true,
      })
    );

    await Promise.all(updatePromises);
  }, [user]);

  const deleteNotification = async (notificationId: string) => {
    try {
      const notificationRef = doc(dataBase, "notifications", notificationId);
      await deleteDoc(notificationRef);
      console.log("알람 삭제 성공");
    } catch (error) {
      console.error("알람 삭제 에러: ", error);
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
