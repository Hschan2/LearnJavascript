import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const EventButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255);
  border-radius: 14px;
  width: 150px;
  color: white;
  font-size: 14px;
  padding: 10px 12px;
  cursor: pointer;

  svg {
    width: 50px;
    color: tomato;
  }
`;