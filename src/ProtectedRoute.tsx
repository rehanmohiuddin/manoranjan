import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserRequest } from "./actions/auth";
import { authState } from "./types/auth";

interface PropType {
  component: React.FC;
}

const ProtectedRoute: React.FC<PropType> = ({ component: Component }) => {
  const { isLoggedIn } = useSelector(
    (state: { auth: authState }) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  return isLoggedIn ? (
    <Component />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
