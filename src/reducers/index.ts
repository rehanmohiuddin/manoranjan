import { combineReducers } from "redux";
import auth from "./auth";
import likes from "./likes";
import playlist from "./playlist";
import toast from "./toast";
import video from "./video";
import watchlater from "./watchlater";

const rootReducer = combineReducers({
  auth: auth,
  toast: toast,
  video: video,
  playlist: playlist,
  likes: likes,
  watchlater: watchlater,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
