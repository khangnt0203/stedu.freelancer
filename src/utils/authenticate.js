import axiosHelper from "../helpers/axiosHelper";

const AuthenticateAPI = {
  signUp: (params) => {
    const url = `/authenticate/register`;
    return axiosHelper.post(url, params);
  },
  login: (params) => {
    const url = `/authenticate/login`;
    return axiosHelper.post(url, params);
  },
};

export default AuthenticateAPI;

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setExpired = (status) => {
  sessionStorage.setItem("expired", status);
};

export const getExpired = () => {
  return sessionStorage.getItem("expired");
};

export const removeToken = () => {
  return localStorage.removeItem("token");
};

export const isLogin = () => {
  if (getToken() === null) {
    return false;
  }
  return true;
};

export const checkState = () =>{
if(getExpired() === "true"){
  removeToken();
  return false;
}
return true;
}