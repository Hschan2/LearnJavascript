import { useCallback, useEffect, useRef, useState } from "react";
import { NotificationType } from "../components/types/notifications";
import { auth, dataBase } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNotificationMessage } from "../components/utils/notificationMessageContext";

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const user = auth.currentUser;
  const { setMessage } = useNotificationMessage();
  const lastNotificationId = useRef<string | null>(null);

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

  useEffect(() => {
    if (!user) return;

    const notificationQuery = query(
      collection(dataBase, "notifications"),
      where("recipientId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(notificationQuery, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as NotificationType[];

      if (
        newNotifications.length > 0 &&
        newNotifications[0].id !== lastNotificationId.current
      ) {
        const latestNotification = newNotifications[0];
        setMessage(
          `${latestNotification.senderName}님이 ${latestNotification.tweetTitle}에 좋아요를 눌렀습니다.`
        );
        lastNotificationId.current = latestNotification.id;
      }

      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [user, notifications, setMessage]);

  return { notifications, markAllAsRead, deleteNotification };
};
