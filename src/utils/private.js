import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkState, isLogin } from "./authenticate";


const PrivateRoute = () => {
  return isLogin() === true && checkState() === true ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
