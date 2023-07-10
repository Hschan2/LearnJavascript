import { useContext } from "react";
import { useRouterType } from "../type/ContextType";
import { RouterContext } from "../context/RouterContext";

// 생성된 Context 값들을 가져온 뒤 반환
const useRouter = (): useRouterType => {
  const value = useContext(RouterContext);

  if (value === null) throw new Error("Router 컴포넌트에서 호출해야 합니다.");

  // value값이 null일 수도 있으니, 조건문 다음으로 작성, 조건문 위에 쓰면 null이 올 수도 있으니 에러 발생
  const { currentPath, changePath } = value;
  const pathname = currentPath;
  const push = (push: string) => {
    changePath(push);
  }

  return { push, pathname };
};

export default useRouter;
