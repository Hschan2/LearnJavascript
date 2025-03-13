import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 2vw, 10px);
  padding: clamp(20px, 5vw, 40px) 0;
`;

export const EventButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.border};
  border-radius: 14px;
  width: clamp(120px, 10vw, 150px);
  color: ${(props) => props.theme.text};
  font-size: clamp(12px, 2vw, 14px);
  padding: clamp(8px, 2vw, 10px) clamp(10px, 3vw, 12px);
  cursor: pointer;

  svg {
    width: clamp(30px, 5vw, 50px);
    color: tomato;
  }
`;
