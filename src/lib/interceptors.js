import axios from "axios";
const instance = axios.create();

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sento
    if (config?.url?.indexOf("/login") === -1) {
      if (!config.headers.Authorization) {
        if (!config.headers) {
          config.headers = {};
        }
        const token = JSON.parse(localStorage.getItem("token"));
        config.headers["Authorization"] = token;
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.toJSON());

    return Promise.reject(error);
  }
);

export default instance;
