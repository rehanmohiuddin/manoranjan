export interface ToastPayload {
  open: boolean;
  message: string;
  action?: Function;
  type: string;
}

export interface toastState {
  open: boolean;
  message: string;
}

export type toastAction = {
  type: string;
  payload: ToastPayload;
};
