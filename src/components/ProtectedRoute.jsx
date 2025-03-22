import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({element: Component, ...rest}) => {
    const isAuthenticated = useSelector((state)=> state.userInfo.isAuthenticated);
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;