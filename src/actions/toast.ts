import { ToastPayload } from "../types/toast";

const OPEN_TOAST = "OPEN_TOAST";
const CLOSE_TOAST = "HIDE_TOAST";

const toastType = {
  success: "SUCCESS",
  fail: "FAILURE",
};

const openToast = (payload: ToastPayload) => ({
  type: OPEN_TOAST,
  payload,
});

const closeToast = () => ({
  type: OPEN_TOAST,
});

export { OPEN_TOAST, CLOSE_TOAST, openToast, closeToast, toastType };
