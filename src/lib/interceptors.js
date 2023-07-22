import axios from "axios";
import { clearLocalStorage, getAuthDetails } from "./localStorage";
import { onLogout } from "../context/action-creators";
import { connect } from "react-redux";
import { toast } from "react-toastify";
const instance = axios.create();

instance.interceptors.request.use(
  function(config) {
    // Do something before request is sento
    if (config?.url?.indexOf("/login") === -1) {
      if (!config.headers.Authorization) {
        if (!config.headers) {
          config.headers = {};
        }
        const token = getAuthDetails()?.token;
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log({ error: error.response });
    if (error && error?.response && error?.response?.status == "401") {
      clearLocalStorage();
      logoutUser();
      toast.error("Session Expired!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // window.location.href('/')
    }

    return Promise.reject(error);
  }
);

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(onLogout),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(instance);
