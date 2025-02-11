import React, { ReactNode } from "react";
import {
  ButtonGroup,
  ErrorBoundaryButton,
  ErrorWrapper,
} from "./styles/error-components";
import { useNavigate } from "react-router";

class ErrorBoundaryWWrapper extends React.Component<
  { children: ReactNode; navigate: (path: string) => void },
  { hasError: boolean }
> {
  constructor(props: {
    children: ReactNode;
    navigate: (path: string) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary에서 에러 발생: ", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </h2>
          <p>페이지 에러가 발생하였습니다.</p>
          <ButtonGroup>
            <ErrorBoundaryButton
              onClick={() => this.setState({ hasError: false })}
            >
              새로고침
            </ErrorBoundaryButton>
            <ErrorBoundaryButton
              className="secondary"
              onClick={() => this.props.navigate("/")}
            >
              홈으로 이동
            </ErrorBoundaryButton>
          </ButtonGroup>
        </ErrorWrapper>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundaryWWrapper navigate={navigate}>
      {children}
    </ErrorBoundaryWWrapper>
  );
};

export default ErrorBoundary;
