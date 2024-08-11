import { useState, useEffect } from "react";
import { NotificationType } from "../components/types/notifications";
import { auth, dataBase } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
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

  const handleNotificationClick = (notification: NotificationType) => {
    navigate(`/tweets/${notification.tweetId}`);
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
          <NotificationButton>읽음</NotificationButton>
        </NotificationContainer>
      ))}
    </NotificationsWrapper>
  );
}

export default Notification;
