import {
  addplayListVideoPayload,
  createPlayListPayload,
  deletePlayListPayload,
  deleteplayListVideoPayload,
  fetchAllPlaylistsSuccessPayload,
  fetchPlaylistVideoPayload,
} from "../types/playlist";

const CREATE_PLAYLIST = "CREATE_PLAYLIST";
const CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS";
const DELETE_PLAYLIST = "DELETE_PLAYLIST";
const DELETE_PLAYLIST_SUCCESS = "DELETE_PLAYLIST_SUCCESS";
const REMOVE_VIDEO_FROM_PLAYLIST = "REMOVE_VIDEO_FROM_PLAYLIST";
const REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS = "REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS";
const ADD_VIDEO_TO_PLAYLIST = "ADD_VIDEO_TO_PLAYLIST";
const ADD_VIDEO_TO_PLAYLIST_SUCCESS = "ADD_VIDEO_TO_PLAYLIST_SUCCESS";
const GET_ALL_PLAYLISTS = "GET_ALL_PLAYLISTS";
const GET_ALL_PALYLIST_VIDEOS = "GET_ALL_PALYLIST_VIDEOS";
const GET_ALL_PLAYLISTS_SUCCESS = "GET_ALL_PLAYLISTS_SUCCESS";

const createPlaylist = (payload: createPlayListPayload) => ({
  type: CREATE_PLAYLIST,
  payload,
});

const deletePlaylist = (payload: deletePlayListPayload) => ({
  type: DELETE_PLAYLIST,
  payload,
});

const addVideoToPlaylist = (payload: addplayListVideoPayload) => ({
  type: ADD_VIDEO_TO_PLAYLIST,
  payload,
});

const removeVideoFromPlaylist = (payload: deleteplayListVideoPayload) => ({
  type: REMOVE_VIDEO_FROM_PLAYLIST,
  payload,
});

const getAllPlaylists = () => ({
  type: GET_ALL_PLAYLISTS,
});

const getVideosFromPlaylist = (payload: fetchPlaylistVideoPayload) => ({
  type: GET_ALL_PALYLIST_VIDEOS,
  payload,
});

const fetchAllPlaylistsSuccess = (
  payload: fetchAllPlaylistsSuccessPayload
) => ({
  type: GET_ALL_PLAYLISTS_SUCCESS,
  payload,
});

const addVideoToPlaylistSuccess = (payload: addplayListVideoPayload) => ({
  type: ADD_VIDEO_TO_PLAYLIST_SUCCESS,
  payload,
});

const removeVideofromPlaylistSuccess = (
  payload: deleteplayListVideoPayload
) => ({
  type: REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS,
  payload,
});

const deletePlaylistSuccess = (payload: deletePlayListPayload) => ({
  type: DELETE_PLAYLIST_SUCCESS,
  payload,
});

const createPlaylistSuccess = (payload: createPlayListPayload) => ({
  type: CREATE_PLAYLIST_SUCCESS,
  payload,
});

export {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST,
  createPlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getAllPlaylists,
  getVideosFromPlaylist,
  fetchAllPlaylistsSuccess,
  addVideoToPlaylistSuccess,
  removeVideofromPlaylistSuccess,
  deletePlaylistSuccess,
  createPlaylistSuccess,
  GET_ALL_PLAYLISTS,
  GET_ALL_PALYLIST_VIDEOS,
  GET_ALL_PLAYLISTS_SUCCESS,
  ADD_VIDEO_TO_PLAYLIST_SUCCESS,
  REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_SUCCESS,
};
