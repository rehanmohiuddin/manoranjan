import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { makeServer } from "./server";
import { Provider } from "react-redux";
import store from "./store";

// Call make Server
makeServer();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
