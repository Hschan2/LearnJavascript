import { styled } from "styled-components";

export const ErrorBoundaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  text-align: center;

  svg {
    width: 50px;
    height: 50px;
    color: red;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ErrorBoundaryButton = styled.button`
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
    background-color: ${(props) => props.theme.background};

    &:hover {
      background-color: ${(props) => props.theme.hover};
    }
  }
`;

// 404
export const NotFoundPageWrapper = styled.div`
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

export const NotFoundTitle = styled.h2`
  font-weight: 600;
  font-size: 24px;
`;

export const NotFoundDescription = styled.p`
  color: #797979;
`;
