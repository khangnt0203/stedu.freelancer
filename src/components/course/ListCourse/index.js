import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PaymentIcon from "@mui/icons-material/Payment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CourseAPI from "../../../utils/course";
import numeral from "numeral";
function ListCourse({ filterSubject, filterClassName }) {
  const [listCourse, setListCourse] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [subject, setSubject] = useState();
  useEffect(() => {
    const getListCourse = async () => {
      try {
        if (typeof filterSubject === "undefined" || filterSubject === "all") {
          filterSubject = "";
        }
        if (typeof filterClassName === "undefined" || filterClassName === " ") {
          filterClassName = "";
        }
        const response = await CourseAPI.getListCourse(
          filterClassName,
          filterSubject,
          page,
          6
        );
        setTotalPage(response.total);
        setListCourse(response.data);
        setPage(response.page);

        if (filterSubject === "") {
          setSubject("Tất cả");
        } else {
          const res = await CourseAPI.getSubjectById(filterSubject);
          setSubject(res.data[0].name);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getListCourse();
  }, [filterSubject, filterClassName]);

  return (
    <div className="w-full">
      <div className="font-semibold text-center text-xl md:text-2xl">
        Khoá học liên quan:{" "}
        {filterClassName === "" || typeof filterClassName === "undefined"
          ? subject
          : subject + "-" +filterClassName}
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
        {listCourse?.length !== 0 ? (
          listCourse?.map((a) => (
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: "0px 0px 8px #888888",
                borderRadius: "8px",
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={a.image}
                title="STEDU"
              />
              <CardContent>
                <h1 className="font-semibold text-blue-800 text-lg md:text-xl">
                  {a.name}
                </h1>

                <h2 className=" text-[#084594] text-sm md:text-base">
                  {" "}
                  Gia sư: {a.teacherName}
                </h2>

                <p>
                  {/* <AccessibilityIcon /> */}
                  {/* Lượt đăng kí: {a.registration} */}
                </p>
                <span className="flex justify-between text-xs md:text-sm">
                  Thời gian học: {a.duration}{" "}
                  {a.durationUnit === "MONTH" ? "tháng" : "tuần"}
                  <p className="text-red-700 text-xs md:text-sm font-bold">
                    {/* <PaymentIcon /> */}
                    Giá: {numeral(a.price).format("0,0")} đ
                  </p>
                </span>

                <p className="mt-2 text-xs md:text-sm">{a.shortDescription} </p>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Share</Button> */}
                <Button size="small" variant="contained">
                  <a href={`/course/${a.id}`}>Chi tiết</a>
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center mt-8">Môn học này chưa có lớp! Vui lòng quay lại sau</div>
        )}
      </div>

      {totalPage !== 0 ? (
        <Pagination
          className="grid justify-items-center py-4"
          count={Math.round(totalPage / 6)}
          variant="outlined"
          boundaryCount={0}
          onChange={(e, value) => setPage(value)}
        />
      ) : null}
    </div>
  );
}

export default ListCourse;
