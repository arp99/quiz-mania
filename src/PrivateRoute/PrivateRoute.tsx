import { Navigate , useLocation , Route } from "react-router-dom"
import { useAppSelector } from "../app/Hooks/hooks";
export const PrivateRoute = ({ path , ...props} : any) => {
    const { token } = useAppSelector( (state) => state.auth )
    const location = useLocation()
    return  token ? 
            <Route path={path} {...props} /> 
            : 
            <Navigate state={{ from : location.pathname }} replace to="/" />
}