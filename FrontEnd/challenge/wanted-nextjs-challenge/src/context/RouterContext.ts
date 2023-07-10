import { createContext } from "react";
import { RouterContextType } from "../interface/RouteInterface";

// Props Drilling 방지 => pathname 관리
export const RouterContext = createContext<RouterContextType | null>(null);