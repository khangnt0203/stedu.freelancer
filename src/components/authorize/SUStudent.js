import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Signup from "../../images/signup.gif";
import FormHook from "../hook-form/FormHook";
import {
  Box,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AuthenticateAPI from "../../utils/authenticate";
import Swal from "sweetalert2";

function SUStudent(props) {

  // const LICENSE_KEY = "UnIBXgZmU3aRY2uG7TMI8iHjWeIWap"
  // const API_BASE_URL = "https://minhtn-api.mirrorfly.com/api/v1"

  // const initSDK = async () => {
  //   const initializeObj = {
  //     apiBaseUrl: API_BASE_URL,
  //     licenseKey: LICENSE_KEY,
  //   };
  //   await SDK.initializeSDK(initializeObj);
  // }

  // useEffect(() => {
  //   initSDK()
  // })

  // const registerUser = async (data) => {
  //   let userId = Math.floor(Math.random() * 1000000000);;
  //   let userRegistration = await SDK.register(userId);
  //   if (userRegistration.data !== null) {
  //     console.log(userRegistration.data);
  //     data.usernameMirrorFly = userRegistration.data?.username;
  //     data.passwordMirrorFly = userRegistration.data?.password
  //     handleSignUp(data);
  //   }
  // }

  const handleSignUp = async (data) => {
    try {
      await AuthenticateAPI.signUp(data);
      Swal.fire("Đăng ký thành công!", "", "success");
      window.location.assign("/login");
    } catch (error) {
      Swal.fire(`${error.response.data.message === "Username already exists" ? "Tên đăng nhập đã tồn tại!" : "Lỗi!"}`, "", "error");
      console.log("Error:", error.response.data.message);
    }
  };
  const defaultValues = {
    username: "",
    password: "",
    fullName: "",
    phone: "",
    email: "",
    role: "STUDENT",
    usernameMirrorFly: "",
    passwordMirrorFly: "",
  };
  const methods = useForm({ defaultValues });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const [check, setCheck] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: "100%",
    maxWidth: "100vw",
    maxHeight: "100%",
    position: "fixed",
    top: "50%",
    left: "0",
    transform: "translate(0, -50%)",
    overflowY: "auto",
  };
  return (
    <div className="max-w-[1240px] mx-auto px-2 py-2">
      <div className="grid grid-cols-3 ">
        <div className="lg:col-span-2 col-span-3  my-auto">
          <h1 className="text-lg md:text-xl font-bold grid justify-items-center">
            Đăng ký học viên
          </h1>

          <FormHook methods={methods} onSubmit={handleSubmit(handleSignUp)}>
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
              <TextField
                label="Họ tên"
                type={"text"}
                {...register("fullName", {
                  required: "Vui lòng nhập họ tên",
                })}
                error={!!errors?.fullName}
                helperText={errors?.fullName ? errors?.fullName.message : null}
              />
              <TextField
                label="Email"
                type={"text"}
                {...register("email", {
                  required: "Vui lòng nhập email",
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors?.email.message : null}
              />
              <TextField
                label="Số điện thoại"
                type={"text"}
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                })}
                error={!!errors?.phone}
                helperText={errors?.phone ? errors?.phone.message : null}
              />
              <LoadingButton
                size="small"
                variant="contained"
                loading={isSubmitting}
                type="submit"
              // disabled={check === true ? false : true}
              >
                Đăng ký
              </LoadingButton>
            </div>
          </FormHook>
        </div>
        <img src={Signup} className="col-span-3 lg:col-span-1" />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontWeight={'bold'} variant="h6" component="h2">
            Điều khoản đăng ký
          </Typography>
          <Typography>
            {" "}
            - Gia sư nhận lớp có trách nhiệm cung cấp thông tin về cá nhận như địa
            chỉ, tên tuổi, giới tính, trình độ, năng lực… cũng như các bằng cấp,
            giấy tờ liên quan: thẻ sinh viên, chứng minh nhân dân, bảng điểm,
            v.v
          </Typography>
          <Typography>
            {" "}
            <div className="flex">
              - Sau khi hoàn thành khoá học, gia sư nhận lớp sẽ phải thanh toán lệ
              <p className="font-semibold italic ml-1">phí kết nối cho Trung tâm là</p> <p className="font-semibold text-red-700 ml-1">15%</p>.
            </div>
          </Typography>{" "}
          <Typography>
            - Gia sư không được tự ý tăng lương, giảm thời gian dạy, dạy dồn, giao
            lớp cho người khác… khi chưa có sự đồng ý của Trung tâm, làm ảnh
            hưởng đến việc học của học viên. Gia sư phải có trách nhiệm đối với
            lớp dạy, phải thể hiện được sự chuyện nghiệp và tác phong nghề
            nghiệp của mình. Gia sư cần chuẩn bị nội dung dạy, lên lộ trình rõ
            ràng, đồng thời ý thức bảo vệ uy tín của mình và của Trung tâm.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default SUStudent;
