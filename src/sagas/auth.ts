import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getUserSuccess,
  GET_USER_REQUEST,
  loginFailure,
  loginSuccess,
  LOGIN_REQUEST,
  registerFailure,
  registerSuccess,
  REGISTER_REQUEST,
} from "../actions/auth";
import { openToast, toastType } from "../actions/toast";
import { AxiosInstance } from "../AxiosInstance";
import {
  authActions,
  getUserRequestType,
  loginRequest,
  loginRequestPayload,
  registerRequest,
  registerRequestPayload,
} from "../types/auth";

const login = (payload: loginRequestPayload) =>
  AxiosInstance.post("/login", payload);

const register = (payload: registerRequestPayload) =>
  AxiosInstance.post("/open/register", payload);

const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "")
    : null;

function* getUserSaga({ type }: getUserRequestType): any {
  try {
    const response = yield call(getUser);
    yield all([
      put(
        getUserSuccess({
          user: { ...response },
          isLoggedIn: response ? true : false,
        })
      ),
      put(
        openToast({
          open: true,
          message: "Authorized User",
          type: toastType.success,
        })
      ),
    ]);
  } catch (e: any) {
    yield put(
      loginFailure({
        error: e.toString(),
      })
    );
  }
}

function* loginSaga({ type, payload }: loginRequest): any {
  try {
    const response = yield call(login, payload);
    yield all([
      put(
        loginSuccess({
          ...response.data.message.user,
          token: response.data.message.token,
        })
      ),
      put(
        openToast({
          open: true,
          message: type.split("_")[0] + " Success",
          type: toastType.success,
        })
      ),
    ]);
  } catch (e: any) {
    yield put(
      loginFailure({
        error: e.toString(),
      })
    );
  }
}

function* registerSaga({ type, payload }: registerRequest): any {
  try {
    const response = yield call(register, payload);
    yield all([
      put(
        registerSuccess({
          ...response.data,
        })
      ),
      put(
        openToast({
          open: true,
          message: type.split("_")[0] + " Success",
          type: toastType.success,
        })
      ),
    ]);
  } catch (e: any) {
    yield put(
      registerFailure({
        error: e.toString(),
      })
    );
  }
}

function* authSaga() {
  yield all([
    takeLatest(LOGIN_REQUEST, loginSaga),
    takeLatest(REGISTER_REQUEST, registerSaga),
    takeLatest(GET_USER_REQUEST, getUserSaga),
  ]);
}

export default authSaga;
