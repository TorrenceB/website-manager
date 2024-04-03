import { Navigate, Outlet } from "react-router";

import { useAuth } from "../context";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
