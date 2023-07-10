import { RoutingProps } from '../interface/RouteInterface'
import useRouter from '../hook/useRouter'

const Routing = ({ children, to }: RoutingProps) => {
    const router = useRouter();

    // MouseEvent<HTMLAnchorElement> 에러 발생 => MouseEvent는 DOM 이벤트로 React로 감싸야 일반적으로 사용가능
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        router.push(to);
    }

    return (
        <a onClick={handleClick} href={to}>
          {children}
        </a>
    );
}

export default Routing