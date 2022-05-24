import { VideoPayload } from "./videos";

export type addToWatchLaterPayload = {
  video: VideoPayload;
};

export type addToWatchLaterSuccessPayload = {
  video: VideoPayload;
};

export type removeFromWatchLaterPayload = {
  video: VideoPayload;
};

export type removeFromWatchLaterSuccessPayload = {
  video: VideoPayload;
};

export type getAllWatchLaterVideoSuccessPayload = {
  videos: VideoPayload[];
};

export interface watchLaterState {
  watchlaterVideos: VideoPayload[];
  allwatchlaterVideos: { [key: string]: VideoPayload };
}

export type watchLaterAction = {
  type: string;
  payload: addToWatchLaterPayload &
    addToWatchLaterSuccessPayload &
    removeFromWatchLaterPayload &
    removeFromWatchLaterSuccessPayload &
    getAllWatchLaterVideoSuccessPayload;
};

export interface addToWatchLatersRequestType {
  type: string;
  payload: addToWatchLaterPayload;
}

export interface removeFromWatchLatersRequestType {
  type: string;
  payload: removeFromWatchLaterPayload;
}

export interface removeAllWatchLaterRequestType {
  type: string;
}

export interface getAllWatchLaterRequestType {
  type: string;
}
