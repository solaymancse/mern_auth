import { node } from "prop-types";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to={"/"} state={{ from: location }} replace />;
    }


    return <>{children}</>;
};

PrivateRoute.propTypes = {
    children: node,
};

export default PrivateRoute;
