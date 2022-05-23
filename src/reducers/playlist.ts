import {
  ADD_VIDEO_TO_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST,
  CREATE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST,
  DELETE_PLAYLIST_SUCCESS,
  GET_ALL_PLAYLISTS_SUCCESS,
  REMOVE_VIDEO_FROM_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS,
} from "../actions/playlist";
import { playlistAction, playlistState } from "../types/playlist";

export default (state: playlistState, action: playlistAction) => {
  const { type, payload } = action;
  const { playlists = [], allPlaylists = {} } = state ?? {};
  const _allPlaylists = { ...allPlaylists };
  const { _id, video_id, video } = payload ?? {};
  const tempPlaylists: string[] = [...playlists],
    tempPlaylistsObj: { [key: string]: {} } = { ...allPlaylists };

  switch (type) {
    case GET_ALL_PLAYLISTS_SUCCESS:
      const { myPlaylists } = payload;
      const getTempPlaylists: string[] = [];
      const getPlaylistsObj: { [key: string]: {} } = {};
      myPlaylists.forEach((playlist) => {
        getTempPlaylists.push(playlist._id);
        getPlaylistsObj[playlist._id] = playlist;
      });
      return {
        ...state,
        playlists: getTempPlaylists,
        allPlaylists: getPlaylistsObj,
      };

    case CREATE_PLAYLIST_SUCCESS:
      const newPlaylists = [_id, ...tempPlaylists];
      tempPlaylistsObj[_id] = { ...payload, videos: [] };
      return {
        ...state,
        playlists: [...newPlaylists],
        allPlaylists: { ...tempPlaylistsObj },
      };

    case DELETE_PLAYLIST_SUCCESS:
      delete _allPlaylists[_id];
      return {
        ...state,
        playlists: [...playlists.filter((playlist) => playlist !== _id)],
        allPlaylists: { ..._allPlaylists },
      };

    case ADD_VIDEO_TO_PLAYLIST_SUCCESS:
      _allPlaylists[_id] = {
        ..._allPlaylists[_id],
        videos: [video, ..._allPlaylists[_id].videos],
      };
      return {
        ...state,
        allPlaylists: {
          ..._allPlaylists,
        },
      };

    case REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        allPlaylists: {
          ...allPlaylists,
          [_id]: {
            ...allPlaylists[_id],
            videos: [
              ...allPlaylists[_id].videos.filter(
                (video) => video.id !== video_id
              ),
            ],
          },
        },
      };

    default:
      return { ...state };
  }
};
