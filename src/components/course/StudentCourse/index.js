import React, { useEffect, useState } from "react";
import { getToken } from "../../../utils/authenticate";
import jwtDecode from "jwt-decode";
import CourseAPI from "../../../utils/course";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Pagination,
} from "@mui/material";
import numeral from "numeral";
import WelcomeUser from "../../layout/WelcomeUser";

function StudentCourse(props) {
  const token = getToken();
  const decode = jwtDecode(token);
  const [listData, setListData] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  useEffect(() => {
    const getListCourseDetails = async () => {
      try {
        const response = await CourseAPI.getListCourseDetailsByStudentId(
          decode.id,
          page
        );
        setListData(response.data);
        setTotalPage(response.total)
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getListCourseDetails();
  }, [token, page]);
  return (
    <div className="max-w-[1240px] mx-auto py-4 px-4">
      <WelcomeUser/>
   <h1 className="font-semibold my-4 uppercase">   Danh sách lớp học đã đăng kí</h1>
      <div className="grid grid-cols-3 gap-2">
      {listData?.length !== 0 ? (
        listData?.map((a) => (
    
           <Card
            sx={{
              maxWidth: 345,
              boxShadow: "0px 0px 8px #888888",
              borderRadius: "8px",
            }}
          >
            {/* <CardMedia
              component="img"
              sx={{ height: 140 }}
              image={a.image}
              title="STEDU"
            /> */}
            <CardContent>
              <h1 className="font-semibold text-blue-800 text-lg md:text-xl">
                {a.courseName}
              </h1>

              <h2 className=" text-[#084594] text-sm md:text-base">
                {" "}
                Gia sư: {a.teacherName}
              </h2>

              <p>
               
                Trạng thái: {a.status === "NEW" ? <Chip label="Mới"/> : a.status === "STARTED" ? <Chip label="Đang học" color="primary"/> : <Chip label="Hoàn tất" color="success"/>} 
              </p>
             

              {/* <p className="mt-2 text-xs md:text-sm" dangerouslySetInnerHTML={{__html: a.description}}/> */}
            </CardContent>
            <CardActions>
              {/* <Button size="small">Share</Button> */}
              <Button size="small" variant="contained">
                <a href={`/course/${a.courseId}/my-course`}>Chi tiết</a>
              </Button>
            </CardActions>
          </Card>
   
        ))
      ) : (
        <div className="grid text-lg md:text-xl  justify-center mt-4 text-center">
          <h1>Bạn chưa đăng ký khoá học nào</h1>
          <a href="/course" className="text-base text-[#085E7D]">
            Tìm kiếm khoá học
          </a>
        </div>
      )}
        </div>
        <Pagination
                          className="grid justify-items-center py-4"
                          count={Math.round(totalPage / 6) + 1}
                          variant="outlined"
                          boundaryCount={0}
                          onChange={(e, value) => setPage(value)}
                        />
    </div>
  );
}

export default StudentCourse;
