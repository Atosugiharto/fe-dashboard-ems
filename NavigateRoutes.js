/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

function NavigateRoutes({ children }) {
  const location = useLocation();
  const path = location.pathname;
  if (path === "/") {
    return <Navigate to="/ohc-sbc-wt" />;
  }
  return children;
}

export default NavigateRoutes;
