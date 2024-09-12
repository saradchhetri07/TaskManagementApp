import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isTokenExpired } from "../utils/checkToken";

const PrivateRoute: React.FC = () => {
  const { token } = useAuth(); // Assuming useAuth provides 'token' (with type safety)

  console.log(`came to check token ${token}`);

  console.log(`came to check token ${isTokenExpired()}`);

  if (!token || isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
