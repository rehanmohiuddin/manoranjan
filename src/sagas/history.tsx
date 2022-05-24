import { all, call, put, takeLatest } from "redux-saga/effects";
import { openToast, toastType } from "../actions/toast";
import {
  addToHistoryVideosSuccess,
  ADD_TO_HISTORY_VIDEOS_REQUEST,
  getAllHistoryVideosRequestSuccess,
  GET_ALL_HISTORY_VIDEOS_REQUEST,
  removeAllHistoryVideosSuccess,
  removeFromHistoryVideosSuccess,
  REMOVE_ALL_HISTORY_VIDEOS_REQUEST,
  REMOVE_FROM_HISTORY_VIDEOS_REQUEST,
} from "../actions/history";

import { removeAllLikedVideosRequestType, VideoPayload } from "../types/videos";
import {
  addTohistoryPayload,
  addTohistoryRequestType,
  getAllhistoryRequestType,
  removeAllhistoryRequestType,
  removeFromHistoryPayload,
  removeFromhistorysRequestType,
} from "../types/history";

const getData = () => JSON.parse(localStorage.getItem("user") ?? "");

const addToDb = ({ key, data }: { key: string; data: any }) =>
  localStorage.setItem("user", JSON.stringify({ ...getData(), [key]: data }));

const addToHistoryVideos = (payload: addTohistoryPayload) => {
  const index = getData().history.findIndex(
    (video: VideoPayload) => video.id === payload.video.id
  );
  index < 0 &&
    addToDb({
      key: "history",
      data: [payload.video, ...getData().history],
    });
};

const removeFromHistoryVideos = (payload: removeFromHistoryPayload) => {
  const historyVideos = [
    ...getData().history.filter(
      (video: VideoPayload) => video.id !== payload.video.id
    ),
  ];
  addToDb({
    key: "history",
    data: historyVideos,
  });
};

const getAllHistoryVideos = () => getData().history;

const removeAllHistoryVideos = () =>
  addToDb({
    key: "history",
    data: [],
  });

function* getAllHistoryVideosSaga({ type }: getAllhistoryRequestType): any {
  try {
    const response = yield call(getAllHistoryVideos);
    yield all([
      put(getAllHistoryVideosRequestSuccess({ videos: response })),
      put(
        openToast({
          open: true,
          message: type.split("_")[0] + " Success",
          type: toastType.success,
        })
      ),
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

function* addToHistoryVideosSaga({
  type,
  payload,
}: addTohistoryRequestType): any {
  try {
    const response = yield call(addToHistoryVideos, payload);
    yield all([
      put(addToHistoryVideosSuccess({ video: payload.video })),
      put(
        openToast({
          open: true,
          message: type.split("_")[0] + " Success",
          type: toastType.success,
        })
      ),
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

function* removeFromHistoryrVideosSaga({
  type,
  payload,
}: removeFromhistorysRequestType): any {
  try {
    const response = yield call(removeFromHistoryVideos, payload);
    yield all([
      put(removeFromHistoryVideosSuccess({ video: payload.video })),
      put(
        openToast({
          open: true,
          message: type.split("_")[0] + " Success",
          type: toastType.success,
        })
      ),
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

function* removeAllHistoryVideosSaga({
  type,
}: removeAllLikedVideosRequestType): any {
  try {
    const response = yield call(removeAllHistoryVideos);
    yield all([
      put(removeAllHistoryVideosSuccess()),
      put(
        openToast({
          open: true,
          message: type.split("_")[0] + " Success",
          type: toastType.success,
        })
      ),
    ]);
  } catch (e) {
    console.log(e);
    yield put(
      openToast({
        open: true,
        message: type.split("_")[0] + " Failed",
        type: toastType.fail,
      })
    );
  }
}

function* historySaga() {
  yield all([
    takeLatest(GET_ALL_HISTORY_VIDEOS_REQUEST, getAllHistoryVideosSaga),
    takeLatest(REMOVE_ALL_HISTORY_VIDEOS_REQUEST, removeAllHistoryVideosSaga),
    takeLatest(ADD_TO_HISTORY_VIDEOS_REQUEST, addToHistoryVideosSaga),
    takeLatest(
      REMOVE_FROM_HISTORY_VIDEOS_REQUEST,
      removeFromHistoryrVideosSaga
    ),
  ]);
}

export default historySaga;