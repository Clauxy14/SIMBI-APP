import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token exists, allow access
  if (token) {
    return children;
  }

  // Otherwise, redirect to login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
