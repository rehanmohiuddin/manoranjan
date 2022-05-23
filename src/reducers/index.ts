import { combineReducers } from "redux";
import auth from "./auth";
import playlist from "./playlist";
import toast from "./toast";
import video from "./video";

const rootReducer = combineReducers({
  auth: auth,
  toast: toast,
  video: video,
  playlist: playlist,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
