import React, { useEffect, useState } from "react";
import { getToken } from "../../../utils/authenticate";
import jwtDecode from "jwt-decode";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CourseAPI from "../../../utils/course";
import numeral from "numeral";
import Swal from "sweetalert2";
import WelcomeUser from "../../layout/WelcomeUser";
function TutorCourse(props) {
  const token = getToken();
  const decode = jwtDecode(token);
  const id = decode.id;
  const [isDelete, setIsDelete] = useState();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [courseId, setCourseId] = useState();
  const TABLE_HEAD = [
    { id: "index", label: "#", align: "left" },
    { id: "title", label: "Tên lớp học", align: "left" },
    { id: "price", label: "Phí đăng kí", align: "left" },
    { id: "public", label: "Chức năng", align: "left" },
  ];
  const [listData, setListData] = useState();
  const [oldImage, setOldImage] = useState();
  useEffect(() => {
    const getListCourseByTeacherId = async () => {
      const response = await CourseAPI.getListCourseByTeacherId(id, 10, 1);
      setListData(response.data)
    };
    getListCourseByTeacherId();
  }, [openDelete,id]);
  const handleOpenEdit = (id) => {
    window.location.assign(`/tutor/course/${id}/edit`);
  };

  const handleOpenDelete = async (id) => {
    setIsDelete(true);
    setCourseId(id);

    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDelete = async () => {
    try {
      await CourseAPI.deleteCourse(courseId);
      Swal.fire("Thành công!", "Đã xoá lớp học ra khỏi hệ thông", "success");
      setOpenDelete(false);
    } catch (error) {
      Swal.fire("Lỗi!", "Vui lòng thử lại sau", "error");
      console.log("Error:", error);
    }
  };
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-4">
      <WelcomeUser/>
      <div className="flex justify-between">
        {" "}
        <h1 className="my-4 font-semibold ">DANH SÁCH LỚP HỌC</h1>
        <Button
          variant="contained"
          onClick={() => window.location.assign("/tutor/new-course")}
          className="order-last"
          size="small"
          startIcon={<AddIcon />}
        >
          Đăng ký lớp
        </Button>
      </div>
      <div className="overflow-y-auto mt-4">
        <Table>
          <TableHead>
            <TableRow
              style={{
                background: "#FFD32D",
              }}
            >
              {TABLE_HEAD.map((head) => (
                <TableCell
                  key={head.id}
                  style={{ color: "#084594", fontWeight: "bold" }}
                >
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listData?.length !==0 ? listData?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography noWrap>{row.name}</Typography>
                </TableCell>
                <TableCell style={{ color: "red" }}>
                  {numeral(row.price).format("0,0")} đ
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenDelete(row.id)}
                    >
                      Xoá
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleOpenEdit(row.id)}
                    >
                      Sửa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )) : <div>Bạn chưa có lớp học! Đăng ký lớp ngay</div>}
          </TableBody>
        </Table>

        <Pagination />
      </div>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Xoá lớp học</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn xoá lớp học này chứ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} variant="outlined">
            Huỷ
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TutorCourse;
