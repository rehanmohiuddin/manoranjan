import {
  addTohistoryPayload,
  addTohistorySuccessPayload,
  getAllhistoryVideoSuccessPayload,
  removeFromHistoryPayload,
  removeFromhistorySuccessPayload,
} from "../types/history";

const ADD_TO_HISTORY_VIDEOS_REQUEST = "ADD_TO_HISTORY_VIDEOS_REQUEST";
const ADD_TO_HISTORY_VIDEOS_SUCCESS = "ADD_TO_WATCH_LATER_VIDEOS_SUCCESS";
const ADD_TO_HISTORY_VIDEOS_FAILURE = "ADD_TO_HISTORY_VIDEOS_FAILURE";

const REMOVE_FROM_HISTORY_VIDEOS_REQUEST = "REMOVE_FROM_HISTORY_VIDEOS_REQUEST";
const REMOVE_FROM_HISTORY_VIDEOS_SUCCESS = "REMOVE_FROM_HISTORY_VIDEOS_SUCCESS";
const REMOVE_FROM_HISTORY_VIDEOS_FAILURE = "REMOVE_FROM_HISTORY_VIDEOS_FAILURE";

const GET_ALL_HISTORY_VIDEOS_REQUEST = "GET_ALL_HISTORY_VIDEOS_REQUEST";
const GET_ALL_HISTORY_VIDEOS_SUCCESS = "GET_ALL_HISTORY_VIDEOS_SUCCESS";

const REMOVE_ALL_HISTORY_VIDEOS_REQUEST = "REMOVE_ALL_HISTORY_VIDEOS_REQUEST";
const REMOVE_ALL_HISTORY_VIDEOS_SUCCESS = "REMOVE_ALL_HISTORY_VIDEOS_SUCCESS";

const getAllHistoryVideosRequest = () => ({
  type: GET_ALL_HISTORY_VIDEOS_REQUEST,
});

const getAllHistoryVideosRequestSuccess = (
  payload: getAllhistoryVideoSuccessPayload
) => ({
  type: GET_ALL_HISTORY_VIDEOS_SUCCESS,
  payload,
});

const addToHistoryVideosRequest = (payload: addTohistoryPayload) => ({
  type: ADD_TO_HISTORY_VIDEOS_REQUEST,
  payload,
});

const addToHistoryVideosSuccess = (payload: addTohistorySuccessPayload) => ({
  type: ADD_TO_HISTORY_VIDEOS_SUCCESS,
  payload,
});

const removeFromHistoryVideosRequest = (payload: removeFromHistoryPayload) => ({
  type: REMOVE_FROM_HISTORY_VIDEOS_REQUEST,
  payload,
});

const removeFromHistoryVideosSuccess = (
  payload: removeFromhistorySuccessPayload
) => ({
  type: REMOVE_FROM_HISTORY_VIDEOS_SUCCESS,
  payload,
});

const removeAllHistoryVideosRequest = () => ({
  type: REMOVE_ALL_HISTORY_VIDEOS_REQUEST,
});

const removeAllHistoryVideosSuccess = () => ({
  type: REMOVE_ALL_HISTORY_VIDEOS_SUCCESS,
});

export {
  ADD_TO_HISTORY_VIDEOS_FAILURE,
  ADD_TO_HISTORY_VIDEOS_REQUEST,
  ADD_TO_HISTORY_VIDEOS_SUCCESS,
  REMOVE_ALL_HISTORY_VIDEOS_REQUEST,
  REMOVE_ALL_HISTORY_VIDEOS_SUCCESS,
  REMOVE_FROM_HISTORY_VIDEOS_FAILURE,
  GET_ALL_HISTORY_VIDEOS_REQUEST,
  GET_ALL_HISTORY_VIDEOS_SUCCESS,
  REMOVE_FROM_HISTORY_VIDEOS_REQUEST,
  REMOVE_FROM_HISTORY_VIDEOS_SUCCESS,
  getAllHistoryVideosRequest,
  getAllHistoryVideosRequestSuccess,
  addToHistoryVideosRequest,
  addToHistoryVideosSuccess,
  removeFromHistoryVideosRequest,
  removeFromHistoryVideosSuccess,
  removeAllHistoryVideosRequest,
  removeAllHistoryVideosSuccess,
};
