import { ReactNode, useContext } from "react"
import { RoutesProps } from "../interface/RouteInterface"
import RouterContext from "../context/RouterContext"

const Routes = ({ children }: RoutesProps) => {
    const { path } = useContext(RouterContext);

    let component: ReactNode = <h1>페이지를 찾을 수 없습니다.</h1>
    
    for (const route of children) {
        if (route.props.path === path) {
            component = route.props.component;
            break;
        }
    }

    return component
}

export default Routes