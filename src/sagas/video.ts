import { all, call, put, takeLatest } from "redux-saga/effects";
import { openToast, toastType } from "../actions/toast";
import {
  getCategoriesSuccess,
  getVideoRequest,
  getVideosRequest,
  getVideosSuccess,
  getVideoSuccess,
  GET_CATEGORIES_REQUEST,
  GET_VIDEOS_REQUEST,
  GET_VIDEO_REQUEST,
} from "../actions/video";
import { YoutubeInstance } from "../AxiosInstance";
import {
  getCategoriesRequestPayload,
  getCategoriesRequestType,
  getVideoRequestPayload,
  getVideoRequestType,
  getVideosRequestPayload,
  getVideosRequestType,
} from "../types/videos";

const queryPayload = {
  key: process.env.REACT_APP_YOUTUBE_KEY,
  regionCode: "IN",
};

const getCategories = (payload: getCategoriesRequestPayload) =>
  YoutubeInstance.get("/videoCategories", {
    params: {
      ...queryPayload,
      ...payload,
    },
  });

const getVideos = (payload: getVideosRequestPayload) =>
  YoutubeInstance.get("/videos", {
    params: {
      ...queryPayload,
      ...payload,
    },
  });

const getVideo = (payload: getVideoRequestPayload) =>
  YoutubeInstance.get("/videos", {
    params: {
      ...queryPayload,
      ...payload,
    },
  });

function* getCategoriesSaga({ type, payload }: getCategoriesRequestType): any {
  try {
    const response = yield call(getCategories, payload);
    yield all([
      put(getCategoriesSuccess(response.data.items)),
      put(
        openToast({
          open: true,
          message: type.split("_")[0] + " Success",
          type: toastType.success,
        })
      ),
    ]);
  } catch (e) {
    console.log(e, YoutubeInstance);
    yield put(
      openToast({
        open: true,
        message: type.split("_")[0] + " Failed",
        type: toastType.fail,
      })
    );
  }
}

function* getVideosSaga({ type, payload }: getVideosRequestType): any {
  try {
    const response = yield call(getVideos, payload);
    const videoIds = response.data.items;
    let videos = "";
    videoIds.forEach(
      (video: { id: string }) => (videos = videos + "," + video.id)
    );
    const videoList = yield call(getVideos, { id: videos, part: "snippet" });
    yield all([
      put(getVideosSuccess({ ...videoList.data })),
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

function* getVideoSaga({ type, payload }: getVideoRequestType): any {
  try {
    const response = yield call(getVideo, payload);
    yield all([
      put(getVideoSuccess(response)),
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

function* videoSaga() {
  yield all([
    takeLatest(GET_CATEGORIES_REQUEST, getCategoriesSaga),
    takeLatest(GET_VIDEO_REQUEST, getVideoSaga),
    takeLatest(GET_VIDEOS_REQUEST, getVideosSaga),
  ]);
}

export default videoSaga;
