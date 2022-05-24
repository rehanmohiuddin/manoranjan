import { all, fork } from "redux-saga/effects";
import authSaga from "./auth";
import videoSaga from "./video";
import playlistSaga from "./playlist";
import likesSaga from "./likes";
import watchlaterSaga from "./watchlater";
import historySaga from "./history";

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(videoSaga),
    fork(playlistSaga),
    fork(likesSaga),
    fork(watchlaterSaga),
    fork(historySaga),
  ]);
}

export type AppState = ReturnType<typeof rootSaga>;

export default rootSaga;
