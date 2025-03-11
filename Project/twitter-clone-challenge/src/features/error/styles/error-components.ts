import { styled } from "styled-components";

// Common Wrapper
export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  gap: 16px;

  svg {
    width: 50px;
    height: 50px;
    color: red;
  }
`;

export const ErrorHandleButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
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
  gap: 1rem;
`;

// not-found component
export const NotFoundTitle = styled.h2`
  font-weight: 600;
  font-size: 24px;
`;

export const NotFoundDescription = styled.p`
  color: #797979;
`;

// 잘못된 요청 및 경로 에러 레이아웃
export const WrongMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
`;
