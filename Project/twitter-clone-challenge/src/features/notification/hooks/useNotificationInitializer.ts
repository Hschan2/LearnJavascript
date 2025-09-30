import { useEffect, useRef } from "react";
import { auth, dataBase } from "../../../firebase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { addFirestoreUnsubscribe } from "../../../lib/firestoreSubscriptions";
import { useNotificationStore } from "../store/notificationStore";
import { NotificationType } from "../types/notifications";

export const useNotificationInitializer = () => {
  const user = auth.currentUser;
  const { setNotifications, addNotifications, setLatestNotification } = useNotificationStore();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!user) return;

    const notificationQuery = query(
      collection(dataBase, "notifications"),
      where("recipientId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(notificationQuery, (snapshot) => {
      const newNotifications: NotificationType[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const docData = { id: change.doc.id, ...change.doc.data() } as NotificationType;
          if (!isInitialLoad.current) {
            setLatestNotification(docData);
          }
          newNotifications.push(docData);
        }
      });

      if (isInitialLoad.current) {
        const initialNotifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NotificationType));
        setNotifications(initialNotifications);
        isInitialLoad.current = false;
      } else {
        if (newNotifications.length > 0) {
          addNotifications(newNotifications);
        }
      }
    });

    addFirestoreUnsubscribe(unsubscribe);

    return () => {
      unsubscribe();
      setNotifications([]);
      setLatestNotification(null);
    };
  }, [user, setNotifications, addNotifications, setLatestNotification]);
};
