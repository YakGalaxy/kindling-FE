import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
