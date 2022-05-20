import axios from "axios";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("token") ?? "").token
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
    if (config.method === "GET") {
      config.params = {
        ...config.params,
        key: process.env.REACT_APP_YOUTUBE_KEY,
        regionCode: "IN",
      };
    }
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
