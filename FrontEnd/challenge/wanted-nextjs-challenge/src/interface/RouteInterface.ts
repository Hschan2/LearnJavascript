import { ReactComponentElement } from "react";
import Route from "../components/Route";

export interface RouteProps {
    path: string;
    component: React.ReactNode;
}

export interface RouterProps {
    children: React.ReactElement<RouteProps>[];
}

export interface RoutesProps {
    children: ReactComponentElement<typeof Route>[];
}