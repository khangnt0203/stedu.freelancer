import React from "react";
import Login1 from "../../images/login.gif";

import TextField from "@mui/material/TextField";


import FormHook from "../hook-form/FormHook";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import AuthenticateAPI, { setToken } from "../../utils/authenticate";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import Util from "../../utils/util";
import ChatAPI from "../../utils/chat";


const LoginButton = styled(LoadingButton)`
  background: #111827;
  color: #ffd32d;
  font-weight: bold;
  :hover {
    background: #111827;
  }
`;
function Login(props) {
  const defaultValues = {
    username: "",
    password: "",
  };
  const methods = useForm({ defaultValues });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onLogin = async (data) => {
    try {
      const response = await AuthenticateAPI.login(data);
      setToken(response);
      let decode = jwtDecode(response);
      let role = decode.role;
      if (role === "STUDENT") {
        window.location.assign('/course')
      }
      if (role === "TEACHER") {
        window.location.assign('/tutor/my-course')
      }
      if (role === "ADMIN") {window.location.assign('/admin')};
    } catch (error) {
      Swal.fire("Vui lòng đăng nhập lại!","", "error")
      console.log('Error:', error)
    }
  };
  return (
    <div className=" bg-[#fbfbfb]">
      <div className="grid grid-cols-3 max-w-[1240px] mx-auto lg:px-32 py-16 ">
        <div className="md:col-span-2 col-span-3 max-h-[480px] my-auto">
          <h1 className="text-lg md:text-xl font-bold grid justify-items-center">
            ĐĂNG NHẬP
          </h1>

          <FormHook methods={methods} onSubmit={handleSubmit(onLogin)}>
            <div className="grid grid-rows-3 gap-2 xl:px-32 px-16 mt-4">
              <TextField
                label="Tên đăng nhập"
                type={"text"}
                {...register("username", {
                  required: "Vui lòng nhập tài khoản",
                })}
                error={!!errors?.username}
                helperText={errors?.username ? errors?.username.message : null}
              />
              <TextField
                label="Mật khẩu"
                type={"password"}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
                error={!!errors?.password}
                helperText={errors?.password ? errors?.password.message : null}
              />

              <LoginButton
                size="small"
                variant="outlined"
                loading={isSubmitting}
                type="submit"
              >
                Đăng nhập
              </LoginButton>
            </div>
          </FormHook>
          <div className="grid justify-items-center">
            <div>
              Bạn chưa có tài khoản?{" "}
              <a
                href="/sign-up-student"
                className="font-semibold text-[#2b7a04]"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
        <img src={Login1} className="col-span-3 md:col-span-1" />
      </div>
    </div>
  );
}

export default Login;
