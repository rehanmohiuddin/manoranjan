import { VideoPayload } from "./videos";

export type addTohistoryPayload = {
  video: VideoPayload;
};

export type addTohistorySuccessPayload = {
  video: VideoPayload;
};

export type removeFromHistoryPayload = {
  video: VideoPayload;
};

export type removeFromhistorySuccessPayload = {
  video: VideoPayload;
};

export type getAllhistoryVideoSuccessPayload = {
  videos: VideoPayload[];
};

export interface historyState {
  historyVideos: VideoPayload[];
  allhistoryVideos: { [key: string]: VideoPayload };
}

export type historyAction = {
  type: string;
  payload: addTohistoryPayload &
    addTohistorySuccessPayload &
    removeFromHistoryPayload &
    removeFromhistorySuccessPayload &
    getAllhistoryVideoSuccessPayload;
};

export interface addTohistoryRequestType {
  type: string;
  payload: addTohistoryPayload;
}

export interface removeFromhistorysRequestType {
  type: string;
  payload: removeFromHistoryPayload;
}

export interface removeAllhistoryRequestType {
  type: string;
}

export interface getAllhistoryRequestType {
  type: string;
}
