import { all, fork } from "redux-saga/effects";

function* rootSaga() {
  yield all([]);
}

export type AppState = ReturnType<typeof rootSaga>;

export default rootSaga;
