export interface getCategoriesRequestPayload {
  chart?: string;
}

export interface getAllLikedVideosSuccessPayload {
  videos: VideoPayload[];
}

export type getVideosRequestPayload = {
  region?: string;
  chart?: string;
  snippet?: string;
  videoCategoryId?: string;
  maxResults?: Number;
  id?: string;
  part?: string;
  pageToken?: string;
};

export type getChannelRequestPayload = {
  part?: string;
  id?: string;
};

export type likeVideoPayload = {
  video: VideoPayload;
};

export type likeVideoSuccessPayload = {
  video: VideoPayload;
};

export type getAllLikedVideoSuccessPayload = {
  videos: VideoPayload[];
};

export type getAllHistoryVideoSuccessPayload = {
  videos: VideoPayload[];
};

export type addToHistoryPayload = {
  _id: string;
};

export type addToHistorySuccessPayload = {
  videos: VideoPayload;
};

export type getChannelSuccessPayload = getVideosSuccessPayload;

export interface videoState {
  videos: {
    items: Array<VideoPayload>;
    nextPageToken: string;
    pageInfo: {
      totalResults: Number;
      resultsPerPage: Number;
    };
  };
  allVideos: { [key: string]: VideoPayload };
  suggestions: {
    items: Array<VideoPayloadSuggested>;
    nextPageToken: string;
    pageInfo: {
      totalResults: Number;
      resultsPerPage: Number;
    };
  };
  videoIds: [string];
  categories: Array<getCategoriesSuccessPayload>;
  loading: boolean;
  likes: [];
  history: [];
  playlists: [];
  watchlater: [];
  videosToFetch: string;
  videoDetail: VideoPayload;
  allChannels: { [key: string]: VideoPayload };
}

export interface likeVideosState {
  likedVideos: VideoPayload[];
  allLikedVideos: {
    [key: string]: { _id: string; name: string; videos: Array<VideoPayload> };
  };
}

export type likeAction = {
  type: string;
  payload: likeVideoPayload &
    likeVideoSuccessPayload &
    getAllLikedVideoSuccessPayload;
};

export type videoAction = {
  type: string;
  payload: getCategoriesRequestPayload &
    getCategoriesSuccessPayload &
    getVideoRequestPayload &
    getVideosRequestPayload &
    getVideosSuccessPayload &
    videoErrorPayload;
};

export type getCategoriesSuccessPayload = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    assignable: boolean;
    channelId: string;
  };
};

export type getVideosSuccessPayload = {
  items: [VideoPayload];
  nextPageToken: string;
  pageInfo: {
    totalResults: Number;
    resultsPerPage: Number;
  };
};

export type getVideoRequestPayload = {
  id?: string;
  relatedToVideoId?: string;
  type?: string;
  maxResults?: Number;
  part?: string;
};

export type VideoPayload = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: Number;
        height: Number;
      };
      medium: {
        url: string;
        width: Number;
        height: Number;
      };
      high: {
        url: string;
        width: Number;
        height: Number;
      };
    };
    channelTitle: string;
    tags: [string];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
};

export type VideoPayloadSuggested = {
  kind: string;
  etag: string;
  id: { videoId: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: Number;
        height: Number;
      };
      medium: {
        url: string;
        width: Number;
        height: Number;
      };
      high: {
        url: string;
        width: Number;
        height: Number;
      };
    };
    channelTitle: string;
    tags: [string];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
};

export type videoErrorPayload = {
  error: {
    code: Number;
    message: string;
    errors: [
      {
        message: string;
        domain: string;
        reason: string;
        location: string;
        locationType: string;
      }
    ];
  };
};

export interface getCategoriesRequestType {
  type: string;
  payload: getCategoriesRequestPayload;
}

export interface getVideosRequestType {
  type: string;
  payload: getVideosRequestPayload;
}

export interface getVideoRequestType {
  type: string;
  payload: getVideoRequestPayload;
}

export interface getChannelRequestType {
  type: string;
  payload: getChannelRequestPayload;
}

export interface getAllLikedVideosRequestType {
  type: string;
}

export interface getMoreVideosRequestType {
  type: string;
  payload: getVideosRequestPayload;
}

export interface likeVideoRequestType {
  type: string;
  payload: likeVideoPayload;
}

export interface addToHistoryRequestType {
  type: string;
  payload: addToHistoryPayload;
}

export interface removeAllLikedVideosRequestType {
  type: string;
}
