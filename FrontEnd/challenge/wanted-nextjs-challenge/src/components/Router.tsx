import { useEffect, useState } from 'react'
import { RouterContextType, RouterProps } from '../interface/RouteInterface';
import { RouterContext } from '../context/RouterContext';

// Props를 Drilling이 되는 것을 방지하기 위해 Router 작성 필요 => Context API
// 상태값 공유 및 페이지 이동 이벤트를 감지하여 상태를 변경해주는 Provider 역할
// 최종적으로 Router는 이벤트 감지와 path를 변화해주는 역할
const Router = ({ children }: RouterProps) => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // popState 이벤트로 앞으로, 뒤로가기 이벤트 감지
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      setCurrentPath(e.state?.path ?? "/");
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 페이지 이동 변화 감지 => window.history.pushState
  const changePath = (to: string) => {
    window.history.pushState({ path: to }, "", to);
    setCurrentPath(to);
  };

  const contextValue: RouterContextType = {
    currentPath,
    changePath,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}

export default Router