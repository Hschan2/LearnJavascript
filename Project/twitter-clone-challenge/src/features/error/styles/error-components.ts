import { styled } from "styled-components";

// Common Wrapper
export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  gap: min(16px, 2vh);

  svg {
    width: clamp(30px, 5vw, 50px);
    height: clamp(30px, 5vw, 50px);
    color: red;
  }
`;

export const ErrorHandleButton = styled.button`
  padding: clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem);
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  &.secondary {
    background-color: #797979;

    &:hover {
      background-color: #000;
    }
  }
`;

// error-boundary component
export const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.8rem, 2vw, 1rem);
`;

// not-found component
export const NotFoundTitle = styled.h2`
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2rem);
`;

export const NotFoundDescription = styled.p`
  color: #797979;
  font-size: clamp(0.9rem, 2vw, 1rem);
`;

// 잘못된 요청 및 경로 에러 레이아웃
export const WrongMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
`;
