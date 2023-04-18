// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { getToken } from "../utils/authenticate";
// import { getToken } from "./Token";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosHelper = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosHelper.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = getToken();
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosHelper.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data.data;
    }
    if (response && response.data) {
      return response.data.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosHelper;
