import axios from "axios";
import store from "../store/store.js";
import { setLoader } from "../store/Slice/loader.js";
import Swal from "sweetalert2";
import { setFavLoader } from "../store/Slice/favLoader.js";
import thunk from "redux-thunk";
export const configAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
});

configAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch(setLoader(false));
    if (localStorage.getItem("token"))
      config.headers = {
        Authorization: `Basic ${localStorage.getItem("token")}`,
      };
    return config;
  },
  function (error) {
    store.dispatch(setLoader(true));

    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
configAxios.interceptors.response.use(
  function (response) {
    store.dispatch(setLoader(true));

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store.dispatch(setLoader(true));
    if (error?.response?.data) {
      if (
        error.response.data.massage === "Error: your email has been blocked"
      ) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.massage,
      });
    }

    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });

    // return Promise.reject(error);
  }
);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkwMGE3NjE3YjUzNjk2ZmEyOTRmZjMiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg3NjA1OTkzfQ.gQnrfC6NNNa8oaFeGq2IE1e83KkPzJNdxbwhYnGxcJQ";

// ECommerce
export const storeAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
});

storeAxios.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token"))
      config.headers = {
        Authorization: `Basic ${localStorage.getItem("token")}`,
      };
    else
      config.headers = {
        Authorization: `Basic ${token}`,
      };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
storeAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.data) {
      if (
        error.response.data.massage === "Error: your email has been blocked"
      ) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      return Promise.reject(error);
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
);

//Stream
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch(setLoader(false));
    if (localStorage.getItem("token"))
      config.headers = {
        Authorization: `Basic ${localStorage.getItem("token")}`,
      };
    else
      config.headers = {
        Authorization: `Basic ${token}`,
      };
    return config;
  },
  function (error) {
    store.dispatch(setLoader(true));

    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    store.dispatch(setLoader(true));

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store.dispatch(setLoader(true));
    if (error?.response?.data) {
      if (
        error.response.data.massage === "Error: your email has been blocked"
      ) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      return Promise.reject(error);
    }
  }
);

export const favAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/user/favorites`,
  headers: {},
});

favAxios.interceptors.request.use(
  function (config) {
    if (navigator.onLine) {
      // Do something before request is sent
      if (localStorage.getItem("token")) {
        store.dispatch(setFavLoader(true));
        config.headers = {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        };
        return config;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Login First",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Network Error",
      });
    }
  },
  function (error) {
    store.dispatch(setFavLoader(false));

    // Do something with request error
    return Promise.reject(error);
  }
);
favAxios.interceptors.response.use(
  function (response) {
    store.dispatch(setFavLoader(false));

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store.dispatch(setFavLoader(false));
    if (error?.response?.data) {
      if (
        error.response.data.massage === "Error: your email has been blocked"
      ) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      return Promise.reject(error);
    }
  }
);
