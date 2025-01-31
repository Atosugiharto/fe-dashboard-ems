/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function UnprotectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/ohc-sbc-wt" />;
  }
  return children;
}

export default UnprotectedRoutes;
