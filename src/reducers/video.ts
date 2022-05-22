import {
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_VIDEOS_FAILURE,
  GET_VIDEOS_REQUEST,
  GET_VIDEOS_SUCCESS,
  GET_VIDEO_FAILURE,
  GET_VIDEO_REQUEST,
} from "../actions/video";
import { videoAction, videoState } from "../types/videos";

export default (state: videoState, action: videoAction) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
      };
    case GET_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: { ...payload },
      };
    case GET_VIDEO_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case GET_VIDEOS_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
