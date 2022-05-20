import {
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CHANNEL_SUCCESS,
  GET_VIDEOS_FAILURE,
  GET_VIDEOS_REQUEST,
  GET_VIDEOS_SUCCESS,
  GET_VIDEO_FAILURE,
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
} from "../actions/video";
import {
  getCategoriesRequestPayload,
  getCategoriesSuccessPayload,
  getVideoRequestPayload,
  getVideosRequestPayload,
  getVideosSuccessPayload,
  videoAction,
  videoErrorPayload,
  VideoPayload,
  videoState,
} from "../types/videos";

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
    case GET_CHANNEL_SUCCESS:
      const _allChannels: { [key: string]: VideoPayload } = {};
      payload.items.forEach((item) => {
        _allChannels[item.id] = item;
      });
      return {
        ...state,
        loading: false,
        allChannels: _allChannels,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
      };
    case GET_VIDEOS_SUCCESS:
      const _allVideos: { [key: string]: VideoPayload } = {};
      payload.items.forEach((item) => {
        _allVideos[item.id] = item;
      });
      return {
        ...state,
        videos: { ...payload },
        allVideos: _allVideos,
      };
    case GET_VIDEO_SUCCESS:
      return {
        ...state,
        suggestions: { ...payload },
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
