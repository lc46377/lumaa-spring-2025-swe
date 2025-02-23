import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const PrivateRoutes: React.FC = () => {
    const authContext = useContext(AuthContext);
    const isAuthenticated = !!authContext?.token;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
