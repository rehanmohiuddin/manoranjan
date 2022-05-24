import {
  getAllLikedVideosSuccessPayload,
  likeVideoPayload,
  likeVideoSuccessPayload,
} from "../types/videos";
import {
  addToWatchLaterPayload,
  addToWatchLaterSuccessPayload,
  getAllWatchLaterVideoSuccessPayload,
  removeFromWatchLaterPayload,
  removeFromWatchLaterSuccessPayload,
} from "../types/watchlater";

const ADD_TO_WATCH_LATER_VIDEOS_REQUEST = "ADD_TO_WATCH_LATER_VIDEOS_REQUEST";
const ADD_TO_WATCH_LATER_VIDEOS_SUCCESS = "ADD_TO_WATCH_LATER_VIDEOS_SUCCESS";
const ADD_TO_WATCH_LATER_VIDEOS_FAILURE = "ADD_TO_WATCH_LATER_VIDEOS_FAILURE";

const REMOVE_FROM_WATCH_LATER_VIDEOS_REQUEST =
  "REMOVE_FROM_WATCH_LATER_VIDEOS_REQUEST";
const REMOVE_FROM_WATCH_LATER_VIDEOS_SUCCESS =
  "REMOVE_FROM_WATCH_LATER_VIDEOS_SUCCESS";
const REMOVE_FROM_WATCH_LATER_VIDEOS_FAILURE =
  "REMOVE_FROM_WATCH_LATER_VIDEOS_FAILURE";

const GET_ALL_WATCH_LATER_VIDEOS_REQUEST = "GET_ALL_WATCH_LATER_VIDEOS_REQUEST";
const GET_ALL_WATCH_LATER_VIDEOS_SUCCESS = "GET_ALL_WATCH_LATER_VIDEOS_SUCCESS";

const REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST =
  "REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST";
const REMOVE_ALL_WATCH_LATER_VIDEOS_SUCCESS =
  "REMOVE_ALL_WATCH_LATER_VIDEOS_SUCCESS";

const getAllWatchLaterVideosRequest = () => ({
  type: GET_ALL_WATCH_LATER_VIDEOS_REQUEST,
});

const getAllWatchLaterVideosRequestSuccess = (
  payload: getAllWatchLaterVideoSuccessPayload
) => ({
  type: GET_ALL_WATCH_LATER_VIDEOS_SUCCESS,
  payload,
});

const addToWatchLaterVideosRequest = (payload: addToWatchLaterPayload) => ({
  type: ADD_TO_WATCH_LATER_VIDEOS_REQUEST,
  payload,
});

const addToWatchLaterVideosSuccess = (
  payload: addToWatchLaterSuccessPayload
) => ({
  type: ADD_TO_WATCH_LATER_VIDEOS_SUCCESS,
  payload,
});

const removeFromWatchLaterVideosRequest = (
  payload: removeFromWatchLaterPayload
) => ({
  type: REMOVE_FROM_WATCH_LATER_VIDEOS_REQUEST,
  payload,
});

const removeFromWatchLaterVideosSuccess = (
  payload: removeFromWatchLaterSuccessPayload
) => ({
  type: REMOVE_FROM_WATCH_LATER_VIDEOS_SUCCESS,
  payload,
});

const removeAllWatchLaterVideosRequest = () => ({
  type: REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST,
});

const removeAllWatchLaterVideosSuccess = () => ({
  type: REMOVE_ALL_WATCH_LATER_VIDEOS_SUCCESS,
});

export {
  ADD_TO_WATCH_LATER_VIDEOS_FAILURE,
  ADD_TO_WATCH_LATER_VIDEOS_REQUEST,
  ADD_TO_WATCH_LATER_VIDEOS_SUCCESS,
  REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST,
  REMOVE_ALL_WATCH_LATER_VIDEOS_SUCCESS,
  REMOVE_FROM_WATCH_LATER_VIDEOS_FAILURE,
  GET_ALL_WATCH_LATER_VIDEOS_REQUEST,
  GET_ALL_WATCH_LATER_VIDEOS_SUCCESS,
  REMOVE_FROM_WATCH_LATER_VIDEOS_REQUEST,
  REMOVE_FROM_WATCH_LATER_VIDEOS_SUCCESS,
  getAllWatchLaterVideosRequest,
  getAllWatchLaterVideosRequestSuccess,
  addToWatchLaterVideosRequest,
  addToWatchLaterVideosSuccess,
  removeFromWatchLaterVideosRequest,
  removeFromWatchLaterVideosSuccess,
  removeAllWatchLaterVideosRequest,
  removeAllWatchLaterVideosSuccess,
};
