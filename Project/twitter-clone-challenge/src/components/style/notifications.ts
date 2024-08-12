import { styled } from "styled-components";

export const NotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 20px 10px;
  padding: 0 14px;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
  padding: 16px 12px;
`;

export const NotificationMessage = styled.span`
  width: 90%;
  font-size: clamp(12px, 2vw, 16px);
  color: ${(props) => props.theme.text};
`;

export const NotificationTimeAgo = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.lightText};
  margin-left: 12px;
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
