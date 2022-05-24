import {
  ADD_TO_HISTORY_VIDEOS_SUCCESS,
  GET_ALL_HISTORY_VIDEOS_SUCCESS,
  REMOVE_ALL_HISTORY_VIDEOS_SUCCESS,
  REMOVE_FROM_HISTORY_VIDEOS_SUCCESS,
} from "../actions/history";
import { likeAction, likeVideosState, VideoPayload } from "../types/videos";
import { historyAction, historyState } from "../types/history";

export default (state: historyState, action: historyAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_HISTORY_VIDEOS_SUCCESS:
      const fetchedHistoryVideosObj: { [key: string]: VideoPayload } = {};
      payload.videos.forEach((video) => {
        fetchedHistoryVideosObj[video.id] = video;
      });
      return {
        ...state,
        historyVideos: [...payload.videos],
        allhistoryVideos: { ...fetchedHistoryVideosObj },
      };

    case ADD_TO_HISTORY_VIDEOS_SUCCESS:
      const myHistoryVideos = !state.allhistoryVideos[payload.video.id]
        ? [payload.video, ...state.historyVideos]
        : [...state.historyVideos];
      return {
        ...state,
        historyVideos: [...myHistoryVideos],
        allhistoryVideos: {
          [payload.video.id]: payload.video,
          ...state.allhistoryVideos,
        },
      };

    case REMOVE_FROM_HISTORY_VIDEOS_SUCCESS:
      const removeHistoryVideosObj = { ...state.allhistoryVideos };
      delete removeHistoryVideosObj[payload.video.id];
      return {
        ...state,
        historyVideos: [
          ...state.historyVideos.filter(
            (video) => video.id !== payload.video.id
          ),
        ],
        allhistoryVideos: { ...removeHistoryVideosObj },
      };

    case REMOVE_ALL_HISTORY_VIDEOS_SUCCESS:
      return {
        ...state,
        historyVideos: [],
        allhistoryVideos: {},
      };

    default:
      return {
        ...state,
      };
  }
};
