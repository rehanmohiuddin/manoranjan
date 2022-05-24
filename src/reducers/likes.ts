import {
  ADD_TO_LIKE_VIDEOS_SUCCESS,
  GET_ALL_LIKED_VIDEOS_SUCCESS,
  REMOVE_ALL_LIKED_VIDEOS_SUCCESS,
  REMOVE_FROM_LIKE_VIDEOS_SUCCESS,
} from "../actions/likes";
import { likeAction, likeVideosState, VideoPayload } from "../types/videos";

const initialState: likeVideosState = {
  likedVideos: [],
  allLikedVideos: {},
};

export default (state: likeVideosState = initialState, action: likeAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_LIKED_VIDEOS_SUCCESS:
      const fetchedLikedVideosObj: { [key: string]: VideoPayload } = {};
      payload.videos.forEach((video) => {
        fetchedLikedVideosObj[video.id] = video;
      });
      return {
        ...state,
        likedVideos: [...payload.videos],
        allLikedVideos: { ...fetchedLikedVideosObj },
      };

    case ADD_TO_LIKE_VIDEOS_SUCCESS:
      return {
        ...state,
        likedVideos: [payload.video, ...state.likedVideos],
        allLikedVideos: {
          [payload.video.id]: payload.video,
          ...state.allLikedVideos,
        },
      };

    case REMOVE_FROM_LIKE_VIDEOS_SUCCESS:
      const removeLikedVideosObj = { ...state.allLikedVideos };
      delete removeLikedVideosObj[payload.video.id];
      return {
        ...state,
        likedVideos: [
          ...state.likedVideos.filter((video) => video.id !== payload.video.id),
        ],
        allLikedVideos: { ...removeLikedVideosObj },
      };

    case REMOVE_ALL_LIKED_VIDEOS_SUCCESS:
      return {
        ...state,
        likedVideos: [],
        allLikedVideos: {},
      };

    default:
      return {
        ...state,
      };
  }
};
