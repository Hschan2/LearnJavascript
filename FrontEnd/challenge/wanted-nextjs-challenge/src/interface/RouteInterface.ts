export interface RouteProps {
    path: string;
    component: React.ReactNode;
}

export interface RoutesProps {
    children: React.ReactElement<RouteProps>[];
}