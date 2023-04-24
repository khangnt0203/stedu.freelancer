import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Signup from "../../images/signup.gif";
import FormHook from "../hook-form/FormHook";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AuthenticateAPI from "../../utils/authenticate";
import Swal from "sweetalert2";
import CourseAPI from "../../utils/course";

function SUTeacher(props) {

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

  const handleSignUp = async () => {
    try {
      // let userId = Math.floor(Math.random() * 1000000000);;
      // let userRegistration = await SDK.register(userId);
      // await new Promise((resolve) => { setTimeout(resolve, 1000) })
      const dataPersonal = new FormData();
      dataPersonal.append("file", imageId);
      const res1 = await CourseAPI.uploadImage(dataPersonal);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const dataStudent = new FormData();
      dataStudent.append("file", imageStudentId);
      const res2 = await CourseAPI.uploadImage(dataStudent);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const dataTrans = new FormData();
      dataTrans.append("file", imageTranscript);
      const res3 = await CourseAPI.uploadImage(dataTrans);
      // if (typeof (imageStudentId) !== "undefined") {
      //   const dataStudent = new FormData();
      //   dataStudent.append("file", imageStudentId);
      //   res2 = await CourseAPI.uploadImage(dataStudent);
       
      // }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const params = {
        username: username,
        password: password,
        fullName: fullName,
        phone: phone,
        email: email,
        personalId: res1.data.data.url,
        studentId:  res2.data.data.url ,
        scoreReport: res3.data.data.url,
        // usernameMirrorFly: userRegistration.data.username,
        // passwordMirrorFly: userRegistration.data.password,
        role: "TEACHER",
      };
      await AuthenticateAPI.signUp(params);
      Swal.fire("Đăng ký thành công!", "", "success");
      window.location.assign("/login");
    } catch (error) {
      Swal.fire("Lỗi!", "Vui lòng thử lại", "error");
      console.log("Error:", error);
    }
  };

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
  const [imageId, setImageId] = useState();
  const [imageStudentId, setImageStudentId] = useState();
  const [imageTranscript, setImageTranscript] = useState();
  const [imagePreviewTrans, setImageReviewTrans] = useState();
  const [imagePreviewId, setImagePreviewId] = useState();
  const [imagePreviewStu, setImagePreviewStu] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleImageID = async (e) => {
    setImageId(e.target.files[0]);
    setImagePreviewId(URL.createObjectURL(e.target.files[0]));
  };
  const handleImageStuID = async (e) => {
    setImageStudentId(e.target.files[0]);
    setImagePreviewStu(URL.createObjectURL(e.target.files[0]));
  };
  const handleImageTrans = async (e) => {
    setImageTranscript(e.target.files[0]);
    setImageReviewTrans(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="max-w-[1240px] mx-auto px-2 py-2 bg-white">
      <div className="grid grid-cols-3 ">
        <div className="lg:col-span-2 col-span-3  my-auto">
          <h1 className="text-lg md:text-xl font-bold grid justify-items-center">
            Đăng ký gia sư
          </h1>

          <FormHook onSubmit={handleSubmit(handleSignUp)}>
            <div className="grid grid-rows-3 gap-2 xl:px-32  mt-4">
              <TextField
                label="Tên đăng nhập"
                type={"text"}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Mật khẩu"
                type={"password"}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Họ tên"
                type={"text"}
                required
                onChange={(e) => setFullName(e.target.value)}
              />

              <TextField
                label="Email"
                type={"text"}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Số điện thoại"
                type={"text"}
                required
                onChange={(e) => setPhone(e.target.value)}
              />

              <div>
                <h1 className="font-semibold">Tải ảnh CMND/CCCD</h1>
                <input
                  type="file"
                  name="idCard"
                  onChange={handleImageID}
                  required
                />
                {imageId ? <img src={imagePreviewId} /> : null}
              </div>
              <div>
                <h1 className="font-semibold">Tải ảnh Thẻ sinh viên</h1>
                <input
                  type="file"
                  name="stuCard"
                  onChange={handleImageStuID}
                />
                {imageStudentId ? <img src={imagePreviewStu} /> : null}
              </div>
              <div>
                <h1 className="font-semibold">Tải ảnh Bảng điểm</h1>
                <input
                  type="file"
                  name="transcript"
                  onChange={handleImageTrans}
                />
                {imageTranscript ? <img src={imagePreviewTrans} /> : null}
              </div>
              <FormControlLabel
                label={
                  <div>
                    Tôi đã đọc và đồng ý với những{" "}
                    <a
                      onClick={handleOpen}
                      className="font-semibold text-[#084594]"
                    >
                      điều khoản và điều kiện của STEDU
                    </a>{" "}
                  </div>
                }
                control={
                  <Checkbox
                    checked={check}
                    onClick={(e) => setCheck(e.target.checked)}
                  />
                }
              />
              <LoadingButton
                size="small"
                variant="contained"
                loading={isSubmitting}
                type="submit"
                disabled={check === true ? false : true}
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
          <Typography fontWeight={"bold"} variant="h6" component="h2">
            Điều khoản đăng ký
          </Typography>
          <Typography>
            {" "}
            - Gia sư nhận lớp có trách nhiệm cung cấp thông tin về cá nhận như
            địa chỉ, tên tuổi, giới tính, trình độ, năng lực… cũng như các bằng
            cấp, giấy tờ liên quan: thẻ sinh viên, chứng minh nhân dân, bảng
            điểm, v.v
          </Typography>
          <Typography>
            {" "}
            <div className="flex">
              - Sau khi hoàn thành khoá học, gia sư nhận lớp sẽ phải thanh toán
              lệ
              <p className="font-semibold italic ml-1">
                phí kết nối cho Trung tâm là
              </p>{" "}
              <p className="font-semibold text-red-700 ml-1">25%</p>.
            </div>
          </Typography>{" "}
          <Typography>
            - Gia sư không được tự ý tăng lương, giảm thời gian dạy, dạy dồn,
            giao lớp cho người khác… khi chưa có sự đồng ý của Trung tâm, làm
            ảnh hưởng đến việc học của học viên. Gia sư phải có trách nhiệm đối
            với lớp dạy, phải thể hiện được sự chuyện nghiệp và tác phong nghề
            nghiệp của mình. Gia sư cần chuẩn bị nội dung dạy, lên lộ trình rõ
            ràng, đồng thời ý thức bảo vệ uy tín của mình và của Trung tâm.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default SUTeacher;
