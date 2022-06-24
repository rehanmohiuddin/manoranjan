import { CLOSE_TOAST, OPEN_TOAST } from "../actions/toast";
import { toastAction, toastState } from "../types/toast";

export default (state: toastState, action: toastAction) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_TOAST:
      return { ...state, open: true, message: payload.message.toLowerCase() };

    case CLOSE_TOAST:
      return {
        ...state,
        open: false,
        message: null,
      };

    default:
      return {
        ...state,
      };
  }
};
