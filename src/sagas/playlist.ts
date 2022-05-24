import { all, call, put, takeLatest } from "redux-saga/effects";
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
import { VideoPayload } from "../types/videos";

const getData = () => JSON.parse(localStorage.getItem("user") ?? "");

const addToDb = ({ key, data }: { key: string; data: any }) =>
  localStorage.setItem("user", JSON.stringify({ ...getData(), [key]: data }));

const getAllPlaylists = () => getData().playlists;

const createPlaylist = (payload: createPlayListPayload) =>
  addToDb({
    key: "playlists",
    data: [{ ...payload, videos: [] }, ...getData().playlists],
  });

const deletePlaylist = (payload: deletePlayListPayload) => {
  const playlists = [
    ...getData().playlists.filter(
      (playlist: { _id: string }) => playlist._id !== payload._id
    ),
  ];
  addToDb({
    key: "playlists",
    data: playlists,
  });
};

const addVideoToPlaylist = (payload: addplayListVideoPayload) => {
  const myPlaylists = getData().playlists;
  const videosIndex = myPlaylists.findIndex(
    (playlist: { _id: string }) => playlist._id === payload._id
  );
  const index = getData().playlists[videosIndex].videos.findIndex(
    (video: VideoPayload) => video.id === payload.video.id
  );
  myPlaylists[videosIndex] = {
    ...myPlaylists[videosIndex],
    videos:
      index < 0
        ? [payload.video, ...myPlaylists[videosIndex].videos]
        : [...myPlaylists[videosIndex].videos],
  };
  addToDb({
    key: "playlists",
    data: [...myPlaylists],
  });
};

const removeVideoFromPlaylist = (payload: deleteplayListVideoPayload) => {
  const myPlaylists = getData().playlists;
  const videosIndex = myPlaylists.findIndex(
    (playlist: { _id: string }) => playlist._id === payload._id
  );
  myPlaylists[videosIndex] = {
    ...myPlaylists[videosIndex],
    videos: [
      ...myPlaylists[videosIndex].videos.filter(
        (video: VideoPayload) => video.id !== payload.video_id
      ),
    ],
  };
  addToDb({
    key: "playlists",
    data: [...myPlaylists],
  });
};

function* getAllPlaylistsSaga({ type }: fetchPlaylistsRequest): any {
  try {
    const response = yield call(getAllPlaylists);
    yield all([
      put(fetchAllPlaylistsSuccess({ myPlaylists: response })),
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

function* createPlaylistSaga({ type, payload }: createPlaylistRequest): any {
  try {
    const response = yield call(createPlaylist, payload);
    yield all([
      put(createPlaylistSuccess(payload)),
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

function* deletePlaylistSaga({
  type,
  payload,
}: deletePlaylistVideoRequest): any {
  try {
    const response = yield call(deletePlaylist, payload);
    yield all([
      put(deletePlaylistSuccess(payload)),
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

function* addVideoToPlaylistSaga({
  type,
  payload,
}: addPlaylistVideoRequest): any {
  try {
    const response = yield call(addVideoToPlaylist, payload);
    yield all([
      put(addVideoToPlaylistSuccess(payload)),
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

function* removeVideoFromPlaylistSaga({
  type,
  payload,
}: deletePlaylistVideoRequest): any {
  try {
    const response = yield call(removeVideoFromPlaylist, payload);
    yield all([
      put(removeVideofromPlaylistSuccess(payload)),
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

function* playlistSaga() {
  yield all([
    takeLatest(CREATE_PLAYLIST, createPlaylistSaga),
    takeLatest(DELETE_PLAYLIST, deletePlaylistSaga),
    takeLatest(ADD_VIDEO_TO_PLAYLIST, addVideoToPlaylistSaga),
    takeLatest(REMOVE_VIDEO_FROM_PLAYLIST, removeVideoFromPlaylistSaga),
    takeLatest(GET_ALL_PLAYLISTS, getAllPlaylistsSaga),
  ]);
}

export default playlistSaga;
