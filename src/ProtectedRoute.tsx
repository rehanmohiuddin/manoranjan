import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface PropType {
  component: React.FC;
}

const ProtectedRoute: React.FC<PropType> = ({ component: Component }) => {
  const location = useLocation();
  const isLoggedIn = true;

  return isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
