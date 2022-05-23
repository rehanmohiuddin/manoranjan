import axios from "axios";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") ?? "").token
  : null;

const YoutubeInstance = axios.create({
  baseURL: process.env.REACT_APP_YOUTUBE_ENDPOINT,
});

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API,
  headers: {
    Authorization: "Bearer " + token,
  },
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { AxiosInstance, YoutubeInstance };
