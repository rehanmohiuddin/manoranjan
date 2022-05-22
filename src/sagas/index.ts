import { all, fork } from "redux-saga/effects";
import authSaga from "./auth";
import videoSaga from "./video";

function* rootSaga() {
  yield all([fork(authSaga), fork(videoSaga)]);
}

export type AppState = ReturnType<typeof rootSaga>;

export default rootSaga;
