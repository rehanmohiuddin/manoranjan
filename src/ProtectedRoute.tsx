import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { authState } from "./types/auth";

interface PropType {
  component: React.FC;
}

const ProtectedRoute: React.FC<PropType> = ({ component: Component }) => {
  const { isLoggedIn } = useSelector(
    (state: { auth: authState }) => state.auth
  );
  const location = useLocation();

  return isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
