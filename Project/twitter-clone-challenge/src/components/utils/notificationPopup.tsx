import styled from "styled-components";
import { useNotificationMessage } from "./notificationMessageContext";

const NotificationPopup = () => {
  const { message, clearMessage } = useNotificationMessage();

  if (!message) return null;

  const handleClick = () => {
    clearMessage();
    window.location.href = "/notification";
  };

  return <PopupWrapper onClick={handleClick}>{message}</PopupWrapper>;
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
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
