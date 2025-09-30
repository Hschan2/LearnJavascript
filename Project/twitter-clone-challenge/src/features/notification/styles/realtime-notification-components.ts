import styled from "styled-components";

export const NotificationWrapper = styled.div`
  background-color: white;
  color: #333;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  border: 1px solid #eee;
`;

export const Message = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  margin-left: 16px;

  &:hover {
    color: #333;
  }
`;
