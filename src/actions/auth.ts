import {
  loginFailurePayload,
  loginRequestPayload,
  loginSuccessPayload,
  registerFailurePayload,
  registerRequestPayload,
  registersuccessPayload,
} from "../types/auth";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

const loginRequest = (payload: loginRequestPayload) => ({
  type: LOGIN_REQUEST,
  payload: payload,
});

const loginSuccess = (payload: loginSuccessPayload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});

const loginFailure = (payload: loginFailurePayload) => ({
  type: LOGIN_FAILURE,
  payload: payload,
});

const registerRequest = (payload: registerRequestPayload) => ({
  type: REGISTER_REQUEST,
  payload: payload,
});

const registerSuccess = (payload: registersuccessPayload) => ({
  type: REGISTER_SUCCESS,
  payload: payload,
});

const registerFailure = (payload: registerFailurePayload) => ({
  type: REGISTER_FAILURE,
  payload: payload,
});

export {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
};
