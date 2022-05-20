import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { makeServer } from "./server";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import ToastContainer from "./components/Toast";

// Call make Server
// makeServer();

const ele = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(ele);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
