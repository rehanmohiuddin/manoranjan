export interface loaderPayload {
  loading: boolean;
}

export interface Login {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  likes: [];
  history: [];
  playlists: [];
  watchlater: [];
}

export interface loginRequestPayload {
  email: string;
  password: string;
}

export interface loginRequest {
  type: string;
  payload: loginRequestPayload;
}

export interface loginSuccessPayload {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  encodedToken: string;
}

export interface registerRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface registersuccessPayload {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  likes: [];
  history: [];
  playlists: [];
  watchlater: [];
}

export interface registerRequest {
  type: string;
  payload: registerRequestPayload;
}

export interface registerFailurePayload {
  error: string;
}

export interface loginFailurePayload {
  error: string;
}

export interface authState {
  loading: boolean;
  isLoggedIn: boolean;
  user: loginSuccessPayload;
  error: string;
  likes: [];
  history: [];
  playlists: [];
  watchlater: [];
  isRegistered: boolean;
}

export type authActions = {
  type: string;
  payload:
    | loginRequestPayload
    | loginSuccessPayload
    | loginFailurePayload
    | registerRequestPayload
    | registersuccessPayload
    | registerFailurePayload
    | loaderPayload;
};
