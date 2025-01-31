/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const path = location.pathname;
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (token && path === "/") {
    return <Navigate to="/ohc-sbc-wt" />;
  }
  return children;
}

export default ProtectedRoutes;
