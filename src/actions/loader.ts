import { loaderPayload } from "../types/auth";

const LOADER_ACTION = "LOADER_ACTION";

const loader = (payload: loaderPayload) => ({
  type: LOADER_ACTION,
  payload,
});

export { LOADER_ACTION, loader };
