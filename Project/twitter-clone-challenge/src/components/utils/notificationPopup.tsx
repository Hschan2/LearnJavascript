import styled from "styled-components";
import { useNotificationMessage } from "./notificationMessageContext";
import { useNavigate } from "react-router";

const NotificationPopup = () => {
  const { message } = useNotificationMessage();
  const navigate = useNavigate();

  if (!message) return null;

  return (
    <PopupWrapper onClick={() => navigate("/notification")}>
      {message}
    </PopupWrapper>
  );
};

export default NotificationPopup;

const PopupWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  z-index: 1000;
`;
