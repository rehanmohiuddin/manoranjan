import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { configureStore } from "@reduxjs/toolkit";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleWare().concat(sagaMiddleware)
      : getDefaultMiddleWare().concat(sagaMiddleware).concat(logger),
});

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
