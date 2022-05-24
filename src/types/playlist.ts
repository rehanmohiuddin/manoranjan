import { VideoPayload } from "./videos";

export interface createPlayListPayload {
  _id: string;
  name: string;
}

export interface fetchPlaylistVideoPayload {
  _id: string;
}

export interface addplayListVideoPayload {
  _id: string;
  video: VideoPayload;
}

export interface deleteplayListVideoPayload {
  _id: string;
  video_id: string;
}

export interface deletePlayListPayload {
  _id: string;
}

export interface playlistState {
  playlists: string[];
  allPlaylists: {
    [key: string]: { _id: string; name: string; videos: Array<VideoPayload> };
  };
}

export interface fetchAllPlaylistsSuccessPayload {
  myPlaylists: [{ _id: string; name: string; videos: [VideoPayload] }];
}

export type playlistAction = {
  type: string;
  payload: createPlayListPayload &
    deletePlayListPayload &
    addplayListVideoPayload &
    deleteplayListVideoPayload &
    fetchAllPlaylistsSuccessPayload;
};

export interface createPlaylistRequest {
  type: string;
  payload: createPlayListPayload;
}
export interface deletePlaylistRequest {
  type: string;
  payload: deletePlayListPayload;
}
export interface deletePlaylistVideoRequest {
  type: string;
  payload: deleteplayListVideoPayload;
}
export interface addPlaylistVideoRequest {
  type: string;
  payload: addplayListVideoPayload;
}

export interface fetchPlaylistVideoRequest {
  type: string;
  payload: fetchPlaylistVideoPayload;
}

export interface fetchPlaylistsRequest {
  type: string;
}
