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
import UserAPI from "../../utils/user";

function ManageUser(props) {
  const [listData, setListData] = useState();
  const [controller, setController] = useState({
    page: 0,
    pageLoad: 1,
    rowsPerPage: 5,
  });
  const TABLE_HEAD = [
    { id: "index", label: "#", align: "left" },
    { id: "title", label: "Tên người đăng ký", align: "left" },
    { id: "public", label: "Chức năng", align: "left" },
  ];
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [subject, setSubject] = useState();
  const [userId, setUserId] = useState();
  const [dataUser, setDataUser] = useState();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = async (id) => {
    setUserId(id);
    setOpen(true);
  };
  const handleOpenDelete = async (id) => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  useEffect(() => {
    const getListRegister = async () => {
      const response = await UserAPI.getListRegister(page);
      setListData(response.data);
      setTotalPage(response.total);
    };
    getListRegister();
  }, [open, openDelete, page]);
  useEffect(() => {
    const getUserById = async () => {
      const response = await UserAPI.getUserById(userId);
      setDataUser(response.data[0]);
    };
    getUserById();
  }, [userId]);
  const handleSubmit = async (status) => {
   const params =  {
      "id":dataUser.id,
      "fullName": dataUser.fullName,
      "email": dataUser.email,
      "phone": dataUser.phone,
      "avatar": dataUser.avatar,
      "personalId": dataUser.personalId,
      "studentId": dataUser.studentId,
      "status": status,
    }
    try {
      await UserAPI.editUser(params)
      Swal.fire("Hoàn tất",'','success')
    } catch (error) {
      Swal.fire("Lỗi!", "Vui lòng thử lại sau", "error")
      console.log("Error:", error)
    }
    setOpen(false)
  };
  const handleDelete = async () => {};
  return (
    <div>
      <div className="flex justify-between">
        {" "}
        <h1 className="my-4 font-semibold ">DANH SÁCH ĐĂNG KÝ</h1>
      </div>
      <div className="overflow-y-auto md:mt-4">
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
                <TableCell>{row.fullName}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {/* <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenDelete(row.id)}
                      >
                        Xoá
                      </Button> */}
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleOpenEdit(row.id)}
                    >
                      Chi tiết
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
          count={Math.round(totalPage / 6) + 1}
          variant="outlined"
          boundaryCount={0}
          onChange={(e, value) => setPage(value)}
        />
      </div>

      {/* thêm/sửa môn học */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>THÔNG TIN CHI TIẾT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tên: <div className="inline text-black">{dataUser?.fullName}</div>
          </DialogContentText>
          <DialogContentText>
            Email: <div className="inline text-black">{dataUser?.email}</div>
          </DialogContentText>
          <DialogContentText>
            SĐT: <div className="inline text-black">{dataUser?.phone}</div>
          </DialogContentText>
          <DialogContentText>
            CMND/CCCD: <img src={dataUser?.personalId} />
          </DialogContentText>
          <DialogContentText>
            Thẻ Sinh viên: <img src={dataUser?.studentId} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Huỷ
          </Button>
          <Button onClick={()=>handleSubmit('DELETED')} variant="outlined" color="error">
            Từ chối
          </Button>
          <Button onClick={()=>handleSubmit("ACTIVE")} variant="contained" color="success">
            Duyệt
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageUser;
