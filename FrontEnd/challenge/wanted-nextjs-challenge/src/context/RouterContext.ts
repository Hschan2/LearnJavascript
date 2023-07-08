import { createContext } from "react"
import { Type } from "../type/ContextType"

const RouterContext = createContext<Type>({
    path: '',
    changePath: () => {},
 })

 export default RouterContext