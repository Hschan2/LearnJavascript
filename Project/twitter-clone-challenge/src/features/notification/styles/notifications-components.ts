import { styled } from "styled-components";

export const NotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 1vw, 8px);
  width: 100%;
  margin: clamp(10px, 3vw, 20px) clamp(5px, 2vw, 10px);
  padding: 0 clamp(10px, 2vw, 14px);
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
  padding: clamp(12px, 2vw, 16px) clamp(10px, 2vw, 12px);
`;

export const NotificationMessage = styled.span`
  width: 90%;
  font-size: clamp(12px, 2vw, 16px);
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

export const NotificationTimeAgo = styled.span`
  font-size: clamp(10px, 1.5vw, 12px);
  color: ${(props) => props.theme.lightText};
  margin-left: clamp(8px, 2vw, 12px);
`;

export const NotificationButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  svg {
    width: clamp(14px, 2vw, 18px);
    height: clamp(14px, 2vw, 18px);
  }
`;

export const NoneNotificationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
