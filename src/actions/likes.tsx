import {
  getAllLikedVideosSuccessPayload,
  likeVideoPayload,
  likeVideoSuccessPayload,
} from "../types/videos";

const ADD_TO_LIKE_VIDEOS_REQUEST = "ADD_TO_LIKE_VIDEOS_REQUEST";
const ADD_TO_LIKE_VIDEOS_SUCCESS = "ADD_TO_LIKE_VIDEOS_SUCCESS";
const ADD_TO_LIKE_VIDEOS_FAILURE = "ADD_TO_LIKE_VIDEOS_FAILURE";

const REMOVE_FROM_LIKE_VIDEOS_REQUEST = "REMOVE_FROM_LIKE_VIDEOS_REQUEST";
const REMOVE_FROM_LIKE_VIDEOS_SUCCESS = "REMOVE_FROM_LIKE_VIDEOS_SUCCESS";
const REMOVE_FROM_LIKE_VIDEOS_FAILURE = "REMOVE_FROM_LIKE_VIDEOS_FAILURE";

const GET_ALL_LIKED_VIDEOS_REQUEST = "GET_ALL_LIKED_VIDEOS_REQUEST";
const GET_ALL_LIKED_VIDEOS_SUCCESS = "GET_ALL_LIKED_VIDEOS_SUCCESS";

const REMOVE_ALL_LIKED_VIDEOS_REQUEST = "REMOVE_ALL_LIKED_VIDEOS_REQUEST";
const REMOVE_ALL_LIKED_VIDEOS_SUCCESS = "REMOVE_ALL_LIKED_VIDEOS_SUCCESS";

const getAllLikedVideosRequest = () => ({
  type: GET_ALL_LIKED_VIDEOS_REQUEST,
});

const getAllLikedVideosRequestSuccess = (
  payload: getAllLikedVideosSuccessPayload
) => ({
  type: GET_ALL_LIKED_VIDEOS_SUCCESS,
  payload,
});

const addToLikeVideosRequest = (payload: likeVideoPayload) => ({
  type: ADD_TO_LIKE_VIDEOS_REQUEST,
  payload,
});

const addToLikeVideosSuccess = (payload: likeVideoSuccessPayload) => ({
  type: ADD_TO_LIKE_VIDEOS_SUCCESS,
  payload,
});

const removeFromLikeVideosRequest = (payload: likeVideoPayload) => ({
  type: REMOVE_FROM_LIKE_VIDEOS_REQUEST,
  payload,
});

const removeFromLikeVideosSuccess = (payload: likeVideoSuccessPayload) => ({
  type: REMOVE_FROM_LIKE_VIDEOS_SUCCESS,
  payload,
});

const removeAllLikedVideosRequest = () => ({
  type: REMOVE_ALL_LIKED_VIDEOS_REQUEST,
});

const removeAllLikedVideosSuccess = () => ({
  type: REMOVE_ALL_LIKED_VIDEOS_SUCCESS,
});

export {
  ADD_TO_LIKE_VIDEOS_REQUEST,
  ADD_TO_LIKE_VIDEOS_SUCCESS,
  ADD_TO_LIKE_VIDEOS_FAILURE,
  GET_ALL_LIKED_VIDEOS_REQUEST,
  GET_ALL_LIKED_VIDEOS_SUCCESS,
  REMOVE_FROM_LIKE_VIDEOS_FAILURE,
  REMOVE_FROM_LIKE_VIDEOS_REQUEST,
  REMOVE_FROM_LIKE_VIDEOS_SUCCESS,
  REMOVE_ALL_LIKED_VIDEOS_REQUEST,
  REMOVE_ALL_LIKED_VIDEOS_SUCCESS,
  getAllLikedVideosRequest,
  getAllLikedVideosRequestSuccess,
  addToLikeVideosRequest,
  addToLikeVideosSuccess,
  removeFromLikeVideosRequest,
  removeFromLikeVideosSuccess,
  removeAllLikedVideosRequest,
  removeAllLikedVideosSuccess,
};
