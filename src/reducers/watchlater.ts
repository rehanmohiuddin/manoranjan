import {
  ADD_TO_LIKE_VIDEOS_SUCCESS,
  GET_ALL_LIKED_VIDEOS_SUCCESS,
  REMOVE_ALL_LIKED_VIDEOS_SUCCESS,
  REMOVE_FROM_LIKE_VIDEOS_SUCCESS,
} from "../actions/likes";
import {
  ADD_TO_WATCH_LATER_VIDEOS_SUCCESS,
  GET_ALL_WATCH_LATER_VIDEOS_SUCCESS,
  REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST,
  REMOVE_FROM_WATCH_LATER_VIDEOS_SUCCESS,
} from "../actions/watchlater";
import { likeAction, likeVideosState, VideoPayload } from "../types/videos";
import { watchLaterAction, watchLaterState } from "../types/watchlater";

const initialState: watchLaterState = {
  watchlaterVideos: [],
  allwatchlaterVideos: {},
};

export default (
  state: watchLaterState = initialState,
  action: watchLaterAction
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_WATCH_LATER_VIDEOS_SUCCESS:
      const fetchedWatchlaterVideosObj: { [key: string]: VideoPayload } = {};
      payload.videos.forEach((video) => {
        fetchedWatchlaterVideosObj[video.id] = video;
      });
      return {
        ...state,
        watchlaterVideos: [...payload.videos],
        allwatchlaterVideos: { ...fetchedWatchlaterVideosObj },
      };

    case ADD_TO_WATCH_LATER_VIDEOS_SUCCESS:
      return {
        ...state,
        watchlaterVideos: [payload.video, ...state.watchlaterVideos],
        allwatchlaterVideos: {
          [payload.video.id]: payload.video,
          ...state.allwatchlaterVideos,
        },
      };

    case REMOVE_FROM_WATCH_LATER_VIDEOS_SUCCESS:
      const removeWatchLaterVideosObj = { ...state.allwatchlaterVideos };
      delete removeWatchLaterVideosObj[payload.video.id];
      return {
        ...state,
        watchlaterVideos: [
          ...state.watchlaterVideos.filter(
            (video) => video.id !== payload.video.id
          ),
        ],
        allwatchlaterVideos: { ...removeWatchLaterVideosObj },
      };

    case REMOVE_ALL_WATCH_LATER_VIDEOS_REQUEST:
      return {
        ...state,
        watchlaterVideos: [],
        allwatchlaterVideos: {},
      };

    default:
      return {
        ...state,
      };
  }
};
