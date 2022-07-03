import {
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../actions/auth";
import { authActions, authState } from "../types/auth";

export default (state: authState, action: authActions) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...payload,
          likes: [],
          history: [],
          playlists: [],
          watchlater: [],
        })
      );
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: {
          ...payload,
          likes: [],
          history: [],
          playlists: [],
          watchlater: [],
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
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
        loading: false,
      };

    case LOG_OUT:
      localStorage.removeItem("user");
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        likes: [],
        history: [],
        playlists: [],
      };

    default:
      return { ...state };
  }
};
