import { all, fork } from "redux-saga/effects";
import authSaga from "./auth";
import videoSaga from "./video";
import playlistSaga from "./playlist";

function* rootSaga() {
  yield all([fork(authSaga), fork(videoSaga), fork(playlistSaga)]);
}

export type AppState = ReturnType<typeof rootSaga>;

export default rootSaga;
