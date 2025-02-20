import { useEffect, useState } from "react";
import { NotificationType } from "../types/notifications";
import { auth, dataBase } from "../../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const user = auth.currentUser;

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

      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [user]);

  return { notifications };
};
