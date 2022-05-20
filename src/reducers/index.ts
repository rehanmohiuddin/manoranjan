import { combineReducers } from "redux";
import auth from "./auth";
import toast from "./toast";
import video from "./video";

const rootReducer = combineReducers({
  auth: auth,
  toast: toast,
  video: video,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
