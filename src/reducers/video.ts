import {
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CHANNEL_SUCCESS,
  GET_MORE_VIDEOS_SUCCESS,
  GET_VIDEOS_FAILURE,
  GET_VIDEOS_REQUEST,
  GET_VIDEOS_SUCCESS,
  GET_VIDEO_FAILURE,
  GET_VIDEO_REQUEST,
  GET_VIDEO_SUCCESS,
} from "../actions/video";
import {
  getCategoriesSuccessPayload,
  videoAction,
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
      const _allCategories: { [key: string]: any } = {};
      payload.items.forEach((category) => {
        _allCategories[category.id] = category;
      });
      return {
        ...state,
        categories: payload.items,
        allCategories: _allCategories,
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
    case GET_MORE_VIDEOS_SUCCESS:
      const _allMoreVideos: { [key: string]: VideoPayload } = {
        ...state.allVideos,
      };
      payload.items.forEach((item) => {
        _allMoreVideos[item.id] = item;
      });
      return {
        ...state,
        videos: {
          ...payload,
          items: [...state.videos.items, ...payload.items],
        },
        allVideos: { ..._allMoreVideos },
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
