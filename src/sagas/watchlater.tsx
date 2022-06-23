import { all, call, put, takeLatest } from "redux-saga/effects";
import { openToast, toastType } from "../actions/toast";
import {
  addToWatchLaterVideosSuccess,
  ADD_TO_WATCH_LATER_VIDEOS_REQUEST,
  getAllWatchLaterVideosRequestSuccess,
  GET_ALL_WATCH_LATER_VIDEOS_REQUEST,
  removeAllWatchLaterVideosSuccess,
  removeFromWatchLaterVideosSuccess,
  REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST,
  REMOVE_FROM_WATCH_LATER_VIDEOS_REQUEST,
} from "../actions/watchlater";

import { VideoPayload } from "../types/videos";
import {
  addToWatchLaterPayload,
  addToWatchLatersRequestType,
  getAllWatchLaterRequestType,
  removeAllWatchLaterRequestType,
  removeFromWatchLaterPayload,
  removeFromWatchLatersRequestType,
} from "../types/watchlater";

const getData = () => JSON.parse(localStorage.getItem("user") ?? "");

const addToDb = ({ key, data }: { key: string; data: any }) =>
  localStorage.setItem("user", JSON.stringify({ ...getData(), [key]: data }));

const addToWatchLaterVideos = (payload: addToWatchLaterPayload) =>
  addToDb({
    key: "watchlater",
    data: [payload.video, ...getData().watchlater],
  });

const removeFromWatchLaterVideos = (payload: removeFromWatchLaterPayload) => {
  const watchLaterVideos = [
    ...getData().watchlater.filter(
      (video: VideoPayload) => video.id !== payload.video.id
    ),
  ];
  addToDb({
    key: "watchlater",
    data: watchLaterVideos,
  });
};

const getAllWatchLaterVideos = () => getData().watchlater;

const removeAllWatchLaterVideos = () =>
  addToDb({
    key: "watchlater",
    data: [],
  });

function* getAllWatchLaterVideosSaga({
  type,
}: getAllWatchLaterRequestType): any {
  try {
    const response = yield call(getAllWatchLaterVideos);
    yield all([
      put(getAllWatchLaterVideosRequestSuccess({ videos: response })),
    ]);
  } catch (e) {
    yield put(
      openToast({
        open: true,
        message: type.split("_")[0] + " Failed",
        type: toastType.fail,
      })
    );
  }
}

function* addToWatchLaterVideosSaga({
  type,
  payload,
}: addToWatchLatersRequestType): any {
  try {
    const response = yield call(addToWatchLaterVideos, payload);
    yield all([put(addToWatchLaterVideosSuccess({ video: payload.video }))]);
  } catch (e) {
    yield put(
      openToast({
        open: true,
        message: "Add to watchlater Failed",
        type: toastType.fail,
      })
    );
  }
}

function* removeFromWatchLaterVideosSaga({
  type,
  payload,
}: removeFromWatchLatersRequestType): any {
  try {
    const response = yield call(removeFromWatchLaterVideos, payload);
    yield all([
      put(removeFromWatchLaterVideosSuccess({ video: payload.video })),
    ]);
  } catch (e) {
    yield put(
      openToast({
        open: true,
        message: "Remove from Watchlater Failed",
        type: toastType.fail,
      })
    );
  }
}

function* removerAllWatchLaterVideosSaga({
  type,
}: removeAllWatchLaterRequestType): any {
  try {
    const response = yield call(removeAllWatchLaterVideos);
    yield all([put(removeAllWatchLaterVideosSuccess())]);
  } catch (e) {
    yield put(
      openToast({
        open: true,
        message: "Remove All Watchlater Failed",
        type: toastType.fail,
      })
    );
  }
}

function* watchlaterSaga() {
  yield all([
    takeLatest(GET_ALL_WATCH_LATER_VIDEOS_REQUEST, getAllWatchLaterVideosSaga),
    takeLatest(
      REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST,
      removerAllWatchLaterVideosSaga
    ),
    takeLatest(ADD_TO_WATCH_LATER_VIDEOS_REQUEST, addToWatchLaterVideosSaga),
    takeLatest(
      REMOVE_FROM_WATCH_LATER_VIDEOS_REQUEST,
      removeFromWatchLaterVideosSaga
    ),
  ]);
}

export default watchlaterSaga;
