import {
  Alert,
  Breadcrumbs,
  Button,
  Chip,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentList from "../../comment";
import { Link, useLocation, useParams } from "react-router-dom";
import CourseAPI from "../../../utils/course";
import numeral from "numeral";
import { getToken, isLogin } from "../../../utils/authenticate";
import Swal from "sweetalert2";
import CartAPI from "../../../utils/cart";
import jwtDecode from "jwt-decode";
import { CommentAPI } from "../../../utils/comment";

function DetailCourse(props) {
  const param = useParams();
  const idCourse = param.idCourse;
  const token = getToken();
  const [detailCourse, setDetailCourse] = useState();
  const [id, setId] = useState();
  const [status, setStatus] = useState();
  const [point, setPoint] = React.useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const getDetailCourse = async () => {
      const response = await CourseAPI.getCourseDetail(idCourse);
      setDetailCourse(response.data);
    };
    getDetailCourse();
  }, [idCourse]);
  const handleAddToCart = async () => {
    if (isLogin() === true) {
      try {
        await CartAPI.add(idCourse);
        Swal.fire("Thành công!", "Đã thêm vào giỏ hàng", "success");
      } catch (error) {
        Swal.fire("Lỗi!", "Vui lòng thử lại sau", "error");
        console.log("Error:", error);
      }
    }
    if (isLogin() === false) {
      Swal.fire("Lỗi!", "Vui lòng đăng nhập và thử lại", "error");
    }
  };
  const location = useLocation();
  useEffect(() => {
    const getCourseStatus = async () => {
      const response = await CourseAPI.getCourseDetailById(idCourse);
      setStatus(response.data[0].status);
      setId(response.data[0].id);
    };
    getCourseStatus();
  }, []);
  const handleUpdateStatusCourseDetail = async (status) => {
    try {
      if (status === "STARTED") {
        await CourseAPI.startCourse(id);
        window.location.reload();
       
      } else {
        await CourseAPI.finishCourse(id);
        window.location.reload();
      }
    } catch (error) {
      Swal.fire("Lỗi!", "Vui lòng thử lại sau", "error");
      console.log("Error:", error);
    }
  };
  const handleComment = async () => {
    if (point === 0) {
      Swal.fire("Vui lòng chọn mức độ!", "", "error");
    }
    if (comment === "") {
      Swal.fire("Vui lòng nhập đánh giá!", "", "error");
    }
    if (point === 0 && comment === "") {
      Swal.fire("Vui lòng hoàn tất đánh giá!", "", "error");
    }
    if (point !== 0 && comment !== "") {
      try {
        await CommentAPI.createPointCourse(idCourse, point);
        await CommentAPI.createComment(idCourse, { content: comment });
        window.location.reload();
        Swal.fire("Đánh giá thành công!", "", "success");
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <div className=" px-4 py-4  text-xs lg:text-sm  max-w-[1240px] mx-auto rounded-md">
      {detailCourse?.map((data) => (
        <>
          <div className="mb-2">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="text.h1">
                <a href="/">Trang chủ</a>
              </Typography>
              <Typography color="text.h1">
                <a href="/course">Khoá học</a>
              </Typography>
              <Typography color="text.primary">
                <div className="font-semibold">{data.name}</div>
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="w-[320px] lg:w-[1240px] lg:px-8 lg:py-4">
       
              <img alt="STEDU" src={data.image} className=" w-full h-full rounded-lg " />
        
         <div className="bg-white px-4 shadow-lg rounded-lg py-2">
         <div>
              <h1 className="text-lg lg:text-3xl font-semibold text-blue-800 my-2">
                {" "}
                {data.name}
              </h1>
              <span className="flex ">
                Gia sư:{" "}
                <h2 className="font-medium ml-2 text-blue-800">
                  {" "}
                  {data.teacherName}
                </h2>
              </span>
              {/* <span>Lượt đăng kí: 200</span> */}
              <p>
                Thời gian học: {data.duration}{" "}
                {data.durationUnit === "MONTH" ? "tháng" : "tuần"}
              </p>
              <div className="flex justify-between items-center border-t py-2 mt-2">
                {" "}
                <div className="text-red-700 font-semibold">
                  Giá:
                  <br className="hidden md:inline" />{" "}
                  {numeral(data.price).format("0,0")} VNĐ
                </div>
                {token ? (
                  jwtDecode(token).role === "STUDENT" &&
                  !location.pathname.includes("/my-course") ? (
                    <button
                      className="bg-[#F8E000] py-1 px-2 md:py-2 md:px-4 rounded-lg text-[0.5rem] md:text-sm font-semibold "
                      type="button"
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  ) :  jwtDecode(token).role === "STUDENT" && status === "NEW" ? (
                    <button
                      className="bg-[#FEF9E1] py-1 px-2 md:py-2 md:px-4 rounded-lg text-[0.5rem] md:text-sm font-semibold hover:bg-[#FDD949]"
                      onClick={() => handleUpdateStatusCourseDetail("STARTED")}
                    >
                      Bắt đầu học
                    </button>
                  ) :  jwtDecode(token).role === "STUDENT" && status === "FINISHED" ? (
                    <Chip label="Đã học" color="success" />
                  ) : jwtDecode(token).role === 'STUDENT' ? (
                    <button
                      className="bg-[#FFEBEB] py-1 px-2 md:py-2 md:px-4 rounded-lg text-[0.5rem] md:text-sm font-semibold hover:bg-[#F1645F]"
                      onClick={() => handleUpdateStatusCourseDetail("FINISHED")}
                    >
                      Hoàn thành
                    </button>
                  ): null
                ) : (
                  <button
                    className="bg-[#F8E000] py-1 px-2 md:py-2 md:px-4 rounded-lg text-[0.5rem] md:text-sm font-semibold"
                    type="button"
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </button>
                )}
              </div>
            </div>
            <div
            className="leading-loose text-justify"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          </div>
          </div>

      
          <div className="border-t mt-4 px-8">
            <CommentList courseId={idCourse} />
          </div>
          {token && status === "FINISHED" && jwtDecode(token).role === "STUDENT" ? (
            <div className="grid grid-rows-1 mt-8 px-8">
              <div className="font-semibold">Mời bạn đánh giá khoá học</div>
              <Rating
                value={point}
                onChange={(event, newValue) => {
                  setPoint(newValue);
                }}
              />

              <TextField
                multiline
                maxRows={4}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Mời bạn nhập đánh giá"
                rows={4}
              />

              <div className="grid lg:grid-cols-7 grid-cols-5">
                <button
                  className="ml-2 bg-[#F8E000] py-1 px-2 md:py-2 md:px-4 rounded-lg text-[0.5rem] md:text-sm font-semibold "
                  onClick={handleComment}
                >
                  Gửi
                </button>
              </div>
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
}

export default DetailCourse;
