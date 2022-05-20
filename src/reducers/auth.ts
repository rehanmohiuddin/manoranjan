import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../actions/auth";
import { authActions, authState } from "../types/auth";

export default (state: authState, action: authActions) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegistered: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return { ...state };
  }
};
