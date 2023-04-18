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
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseAPI from "../../utils/course";
import Swal from "sweetalert2";

function ManageSubject(props) {
  const [listData, setListData] = useState();
  const [controller, setController] = useState({
    page: 0,
    pageLoad: 1,
    rowsPerPage: 5,
  });
  const TABLE_HEAD = [
    { id: "index", label: "#", align: "left" },
    { id: "title", label: "Tên môn học", align: "left" },
    { id: "public", label: "Chức năng", align: "left" },
  ];
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [subject, setSubject] = useState();
  const [subjectId, setSubjectId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const handleClickOpen = () => {
    setIsEdit(false);
    setSubject("");
    setOpen(true);
  };
  const handleOpenEdit = async (id) => {
    setIsEdit(true);
    setSubjectId(id);
    const response = await CourseAPI.getSubjectById(id);
    setSubject(response.data[0].name);
    setOpen(true);
  };
  const handleOpenDelete = async (id) => {
    setIsDelete(true);
    setSubjectId(id);

    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  useEffect(() => {
    const getListSubject = async () => {
      const response = await CourseAPI.getListSubject("", page);
      setTotalPage(response.total);
      setListData(response.data);
    };
    getListSubject();
  }, [open, openDelete, page]);

  const handleSubmit = async () => {
    const paramNew = { subjectName: subject, description: "", image: "" };
    const paramEdit = {
      subjectId: subjectId,
      subjectName: subject,
      description: "",
      image: "",
      status: "ACTIVE",
    };
    if (isEdit === true) {
      try {
        await CourseAPI.updateSubject(paramEdit);
        setOpen(false);
        Swal.fire("Chỉnh sửa lớp thành công!", "", "success");
      } catch (error) {
        console.log("Error:", error);
      }
    }
    if (isEdit === false) {
      try {
        await CourseAPI.createSubject(paramNew);
        setOpen(false);
        Swal.fire("Tạo lớp thành công!", "", "success");
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  const handleDelete = async () => {
    try {
      await CourseAPI.deleteSubject(subjectId);
      Swal.fire("Thành công!", "Đã xoá môn học ra khỏi hệ thông", "success");
      setOpenDelete(false);
    } catch (error) {
      Swal.fire("Lỗi!", "Vui lòng thử lại sau", "error");
      console.log("Error:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        {" "}
        <h1 className="my-4 font-semibold ">DANH SÁCH MÔN HỌC</h1>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          className="order-last"
          size="small"
        >
          Thêm mới môn học
        </Button>
      </div>
      <div className="overflow-y-auto mt-4">
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((head) => (
                <TableCell
                  key={head.id}
                  style={{
                    background: "#FFD32D",
                    color: "#084594",
                    fontWeight: "bold",
                  }}
                >
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listData?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid justify-items-center">
        <Pagination
          className="grid justify-items-center py-4"
          count={Math.round(totalPage / 6) +1}
          variant="outlined"
          boundaryCount={0}
          onChange={(e, value) => setPage(value)}
        />
      </div>

      {/* thêm/sửa môn học */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEdit === true ? "Chỉnh sửa môn học" : "Thêm mới môn học"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit === true
              ? "  Chức năng: Chỉnh sửa môn học trong hệ thống STEDU"
              : "  Chức năng: Tạo môn học mới trong hệ thống STEDU"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên môn học"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Huỷ
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* xoá môn học */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Xoá môn học</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn xoá môn học này chứ?
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

export default ManageSubject;
