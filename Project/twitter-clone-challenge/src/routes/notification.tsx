import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router";
import {
  NotificationButton,
  NotificationContainer,
  NotificationMessage,
  NotificationTimeAgo,
  NotificationsWrapper,
} from "../components/style/notifications";
import { TimeAgo } from "../hooks/useTimeAgo";

function Notification() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const isAllNotificationAsRead = async (userUid: string) => {
    const isReadNotificationQuery = query(
      collection(dataBase, "notifications"),
      where("recipientId", "==", userUid),
      where("isRead", "==", false)
    );

    const isFalseReadSnapshot = await getDocs(isReadNotificationQuery);

    const updatePromises = isFalseReadSnapshot.docs.map((docSnapshot) => {
      return updateDoc(doc(dataBase, "notifications", docSnapshot.id), {
        isRead: true,
      });
    });

    await Promise.all(updatePromises);
  };

  useEffect(() => {
    if (!user) return;

    isAllNotificationAsRead(user.uid);

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

  const handleNotificationClick = (notification: NotificationType) => {
    navigate(`/tweets/${notification.tweetId}`);
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const notificationRef = doc(dataBase, "notifications", notificationId);
      await deleteDoc(notificationRef);
      console.log("알람 삭제 완료");
    } catch (error) {
      console.error(`알람 삭제 에러 발생: ${error}`);
    }
  };

  return (
    <NotificationsWrapper>
      {notifications.map((notification) => (
        <NotificationContainer key={notification.id}>
          <NotificationMessage>
            {`${notification.senderName}님이 ${notification.tweetTitle}에 ${
              notification.type === "like"
                ? "좋아요를 눌렀습니다."
                : "댓글을 작성했습니다."
            }`}
            <NotificationTimeAgo>
              {TimeAgo(new Date(notification.createdAt))}
            </NotificationTimeAgo>
          </NotificationMessage>
          <NotificationButton
            onClick={() => deleteNotification(notification.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </NotificationButton>
        </NotificationContainer>
      ))}
    </NotificationsWrapper>
  );
}

export default Notification;
