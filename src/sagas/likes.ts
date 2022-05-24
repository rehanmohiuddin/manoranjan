import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  addToLikeVideosSuccess,
  ADD_TO_LIKE_VIDEOS_REQUEST,
  getAllLikedVideosRequestSuccess,
  GET_ALL_LIKED_VIDEOS_REQUEST,
  removeAllLikedVideosSuccess,
  removeFromLikeVideosSuccess,
  REMOVE_ALL_LIKED_VIDEOS_REQUEST,
  REMOVE_FROM_LIKE_VIDEOS_REQUEST,
} from "../actions/likes";
import {
  addVideoToPlaylistSuccess,
  ADD_VIDEO_TO_PLAYLIST,
  createPlaylistSuccess,
  CREATE_PLAYLIST,
  deletePlaylistSuccess,
  DELETE_PLAYLIST,
  fetchAllPlaylistsSuccess,
  GET_ALL_PLAYLISTS,
  removeVideofromPlaylistSuccess,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "../actions/playlist";
import { openToast, toastType } from "../actions/toast";
import {
  addplayListVideoPayload,
  addPlaylistVideoRequest,
  createPlayListPayload,
  createPlaylistRequest,
  deletePlayListPayload,
  deletePlaylistRequest,
  deleteplayListVideoPayload,
  deletePlaylistVideoRequest,
  fetchPlaylistsRequest,
} from "../types/playlist";
import {
  getAllLikedVideosRequestType,
  likeVideoPayload,
  likeVideoRequestType,
  removeAllLikedVideosRequestType,
  VideoPayload,
} from "../types/videos";

const getData = () => JSON.parse(localStorage.getItem("user") ?? "");

const addToDb = ({ key, data }: { key: string; data: any }) =>
  localStorage.setItem("user", JSON.stringify({ ...getData(), [key]: data }));

const addToLikeVideos = (payload: likeVideoPayload) =>
  addToDb({
    key: "likes",
    data: [payload.video, ...getData().likes],
  });

const removeFromLikeVideos = (payload: likeVideoPayload) => {
  const likedVideos = [
    ...getData().likes.filter(
      (video: VideoPayload) => video.id !== payload.video.id
    ),
  ];
  addToDb({
    key: "likes",
    data: likedVideos,
  });
};

const getAllLikedVideos = () => getData().likes;

const removeAllLikedVideos = () =>
  addToDb({
    key: "likes",
    data: [],
  });

function* getAllLikedVideosSaga({ type }: getAllLikedVideosRequestType): any {
  try {
    const response = yield call(getAllLikedVideos);
    yield all([
      put(getAllLikedVideosRequestSuccess({ videos: response })),
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

function* addToLikeVideosSaga({ type, payload }: likeVideoRequestType): any {
  try {
    const response = yield call(addToLikeVideos, payload);
    yield all([
      put(addToLikeVideosSuccess({ video: payload.video })),
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

function* removeFromLikeVideosSaga({
  type,
  payload,
}: likeVideoRequestType): any {
  try {
    const response = yield call(removeFromLikeVideos, payload);
    yield all([
      put(removeFromLikeVideosSuccess({ video: payload.video })),
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

function* removerAllLikedVideosSaga({
  type,
}: removeAllLikedVideosRequestType): any {
  try {
    const response = yield call(removeAllLikedVideos);
    yield all([
      put(removeAllLikedVideosSuccess()),
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

function* likesSaga() {
  yield all([
    takeLatest(GET_ALL_LIKED_VIDEOS_REQUEST, getAllLikedVideosSaga),
    takeLatest(REMOVE_ALL_LIKED_VIDEOS_REQUEST, removerAllLikedVideosSaga),
    takeLatest(ADD_TO_LIKE_VIDEOS_REQUEST, addToLikeVideosSaga),
    takeLatest(REMOVE_FROM_LIKE_VIDEOS_REQUEST, removeFromLikeVideosSaga),
  ]);
}

export default likesSaga;
