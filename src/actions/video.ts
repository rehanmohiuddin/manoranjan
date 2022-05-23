import {
  getCategoriesRequestPayload,
  getCategoriesSuccessPayload,
  getChannelRequestPayload,
  getChannelSuccessPayload,
  getVideoRequestPayload,
  getVideosRequestPayload,
  getVideosSuccessPayload,
  videoErrorPayload,
} from "../types/videos";

const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";

const GET_VIDEOS_REQUEST = "GET_VIDEOS_REQUEST";
const GET_VIDEOS_SUCCESS = "GET_VIDEOS_SUCCESS";
const GET_VIDEOS_FAILURE = "GET_VIDEOS_FAILURE";

const GET_VIDEO_REQUEST = "GET_VIDEO_REQUEST";
const GET_VIDEO_SUCCESS = "GET_VIDEO_SUCCESS";
const GET_VIDEO_FAILURE = "GET_VIDEO_FAILURE";

const GET_CHANNEL_REQUEST = "GET_CHANNEL_REQUEST";
const GET_CHANNEL_SUCCESS = "GET_CHANNEL_SUCCESS";
const GET_CHANNEL_FAILURE = "GET_CHANNEL_FAILURE";

const getCategoriesRequest = (payload: getCategoriesRequestPayload) => ({
  type: GET_CATEGORIES_REQUEST,
  payload,
});

const getCategoriesSuccess = (payload: getCategoriesSuccessPayload) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload,
});

const getCategoriesFailure = (payload: videoErrorPayload) => ({
  type: GET_CATEGORIES_FAILURE,
  payload,
});

const getVideosRequest = (payload: getVideosRequestPayload) => ({
  type: GET_VIDEOS_REQUEST,
  payload,
});

const getVideosSuccess = (payload: getVideosSuccessPayload) => ({
  type: GET_VIDEOS_SUCCESS,
  payload,
});

const getVideosFailure = (payload: videoErrorPayload) => ({
  type: GET_VIDEOS_FAILURE,
  payload,
});

const getVideoRequest = (payload: getVideoRequestPayload) => ({
  type: GET_VIDEO_REQUEST,
  payload,
});

const getVideoSuccess = (payload: getVideosSuccessPayload) => ({
  type: GET_VIDEO_SUCCESS,
  payload,
});

const getVideoFailure = (payload: videoErrorPayload) => ({
  type: GET_VIDEO_FAILURE,
  payload,
});

const getChannelRequest = (payload: getChannelRequestPayload) => ({
  type: GET_CHANNEL_REQUEST,
  payload,
});

const getChannelSuccess = (payload: getChannelSuccessPayload) => ({
  type: GET_CHANNEL_SUCCESS,
  payload,
});

const getChannelFailure = (payload: videoErrorPayload) => ({
  type: GET_CATEGORIES_FAILURE,
  payload,
});

export {
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_VIDEOS_FAILURE,
  GET_VIDEOS_REQUEST,
  GET_VIDEOS_SUCCESS,
  GET_VIDEO_FAILURE,
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
  GET_CHANNEL_FAILURE,
  GET_CHANNEL_REQUEST,
  GET_CHANNEL_SUCCESS,
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
  getVideosRequest,
  getVideosSuccess,
  getVideosFailure,
  getVideoRequest,
  getVideoSuccess,
  getVideoFailure,
  getChannelFailure,
  getChannelRequest,
  getChannelSuccess,
};
