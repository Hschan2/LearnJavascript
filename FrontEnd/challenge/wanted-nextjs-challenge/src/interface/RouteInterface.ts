export interface RouterProps {
    children: React.ReactNode;
}

export interface RoutesProps {
    children: React.ReactNode[];
}

export interface RouteProps {
    path: string;
    component: React.ReactNode;
}

export interface RoutingProps {
    children: React.ReactNode;
    to: string;
}

export interface RouterContextType {
    currentPath: string;
    changePath: (to: string) => void;
}