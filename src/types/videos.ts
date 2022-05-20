export interface getCategoriesRequestPayload {
  chart?: string;
}

export interface getVideosRequestPayload {
  region?: string;
  chart?: string;
  snippet?: string;
  videoCategoryId?: string;
  maxResults?: Number;
  id?: string;
  part?: string;
}

export interface videoState {
  videos: {
    items: Array<getVideoSuccessPayload>;
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
}

export type videoAction = {
  type: string;
  payload:
    | getCategoriesRequestPayload
    | getCategoriesSuccessPayload
    | getVideoRequestPayload
    | getVideosRequestPayload
    | getVideosSuccessPayload
    | getVideoSuccessPayload
    | videoErrorPayload;
};

export interface getCategoriesSuccessPayload {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    assignable: boolean;
    channelId: string;
  };
}

export interface getVideosSuccessPayload {
  items: [getVideoSuccessPayload];
  nextPageToken: string;
  pageInfo: {
    totalResults: Number;
    resultsPerPage: Number;
  };
}

export interface getVideoRequestPayload {
  id: string;
}

export interface getVideoSuccessPayload {
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
}

export interface videoErrorPayload {
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
}

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
