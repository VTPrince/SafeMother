import React, { Component, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({element: Component, ...rest}) => {
    const {isAuthenticated, isSessionChecked,user_id} = useSelector((state)=> ({
        isAuthenticated : state.userInfo.isAuthenticated,
        isSessionChecked : state.userInfo.isSessionChecked,
        user_id : state.userInfo.user_id,
    }));

    if (!isSessionChecked) {
        return <div>Loading...</div>;
      }
    
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;