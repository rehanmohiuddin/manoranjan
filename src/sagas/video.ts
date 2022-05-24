import { all, call, put, takeLatest } from "redux-saga/effects";
import { openToast, toastType } from "../actions/toast";
import {
  getCategoriesSuccess,
  getChannelSuccess,
  getMoreVideosSuccess,
  getVideoRequest,
  getVideosRequest,
  getVideosSuccess,
  getVideoSuccess,
  GET_CATEGORIES_REQUEST,
  GET_CHANNEL_REQUEST,
  GET_MORE_VIDEOS_REQUEST,
  GET_VIDEOS_REQUEST,
  GET_VIDEO_REQUEST,
} from "../actions/video";
import { YoutubeInstance } from "../AxiosInstance";
import {
  getCategoriesRequestPayload,
  getCategoriesRequestType,
  getChannelRequestPayload,
  getChannelRequestType,
  getMoreVideosRequestType,
  getVideoRequestPayload,
  getVideoRequestType,
  getVideosRequestPayload,
  getVideosRequestType,
} from "../types/videos";

const queryPayload = {
  key: "AIzaSyBs2aN1-oGERFtogw1__ZhLrzKsFbddRAM",
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
  YoutubeInstance.get("/search", {
    params: {
      ...queryPayload,
      ...payload,
    },
  });

const getChannel = (payload: getChannelRequestPayload) =>
  YoutubeInstance.get("/channels", {
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
      put(
        getVideosSuccess({
          ...videoList.data,
          nextPageToken: response.data.nextPageToken,
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

function* getMoreVideosSaga({ type, payload }: getMoreVideosRequestType): any {
  try {
    const response = yield call(getVideos, payload);
    const videoIds = response.data.items;
    let videos = "";
    videoIds.forEach(
      (video: { id: string }) => (videos = videos + "," + video.id)
    );
    const videoList = yield call(getVideos, { id: videos, part: "snippet" });

    yield all([
      put(
        getMoreVideosSuccess({
          ...videoList.data,
          nextPageToken: response.data.nextPageToken,
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
      put(getVideoSuccess(response.data)),
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

function* getChannelSaga({ type, payload }: getChannelRequestType): any {
  try {
    const response = yield call(getChannel, payload);
    yield put(getChannelSuccess(response.data));
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
    takeLatest(GET_MORE_VIDEOS_REQUEST, getMoreVideosSaga),
    takeLatest(GET_CHANNEL_REQUEST, getChannelSaga),
  ]);
}

export default videoSaga;
