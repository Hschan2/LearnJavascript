import { RouteProps } from '../interface/RouteInterface';

// 요청 경로(Path)에 따라 해당 컴포넌트를 렌더링하는 역할로 Props로 보내준 컴포넌트 또는 null 반환 => 모두 렌더링이 되는 게 맞는 것일까?
const Route = ({ component }: RouteProps) => {
  return <>{component}</>
}

export default Route