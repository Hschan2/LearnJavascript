import { ReactNode, isValidElement } from "react"
import { RouteProps, RoutesProps } from "../interface/RouteInterface"
import useRouter from "../hook/useRouter"

// Route 컴포넌트들 중 현재 렌더링해야 하는 것만 렌더링이 되도록 해주는 역할
// 자식 컴포넌트들을 찾고, 지정한 path와 현재 경로(currentPath)가 같을 때 해당 컴포넌트 렌더링
const Routes = ({ children }: RoutesProps) => {
    const { pathname: currentPath } = useRouter();
    const childArray = Array.isArray(children) ? children : [children];

    // 모든 Route 컴포넌트를 렌더링하는 것을 방지하기 위한 함수
    const currentComponent = (childComponent: ReactNode): boolean => {
        // children을 직접 접근해 하위 Route 컴포넌트에 접근할 필요 => ReactNode 타입으로 지정된 컴포넌트 변수에서 Props 접근 불가
        // 위의 문제를 isValidElement(객체가 React 엘리먼트인지 확인)로 해결
        // isValidElement => type predicate가 되어 있어 조건문 안에서 Props에 접근이 가능하며, 제네릭을 넣으면 Props 타입도 지정 가능
        if (!isValidElement<RouteProps>(childComponent)) return false;

        return childComponent.props.path === currentPath;
    }

    return (
        <>
            {childArray.find(currentComponent)}
        </>
    )
}

export default Routes