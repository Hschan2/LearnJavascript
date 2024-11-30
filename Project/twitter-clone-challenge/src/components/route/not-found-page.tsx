import { useNavigate } from "react-router";
import {
  ErrorBoundaryButton,
  NotFoundDescription,
  NotFoundPageWrapper,
  NotFoundTitle,
} from "../style/error-components";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundPageWrapper>
      <NotFoundTitle>페이지 없음</NotFoundTitle>
      <NotFoundDescription>이 페이지는 없는 페이지입니다.</NotFoundDescription>
      <ErrorBoundaryButton onClick={() => navigate("/")}>
        홈으로 이동
      </ErrorBoundaryButton>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
