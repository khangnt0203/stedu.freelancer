import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { getToken } from "../../utils/authenticate";
import jwtDecode from "jwt-decode";
import UserAPI from "../../utils/user";
import numeral from "numeral";
import { NumericFormat } from "react-number-format";
import { PaymentAPI } from "../../utils/payment";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Swal from "sweetalert2";
import CourseAPI from "../../utils/course";
function MyProfile(props) {
  const [data, setData] = useState();
  const token = getToken();
  const decode = jwtDecode(token);
  const user = decode.id;
  const role = decode.role;
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState("");
  const [personalId, setPersonalId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleRequest = async () => {
    try {
      await PaymentAPI.depositRequest(parseInt(price));
      Swal.fire(
        "Gửi yêu cầu thành công!",
        "Số dư của bạn sẽ được cập nhật ngay khi chúng tôi hoàn tất xác nhận! Vui lòng kiểm tra thông tin",
        "success"
      );
      setOpen(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    const getDataUser = async () => {
      const response = await UserAPI.getUser(user);
      setFullName(response.data[0].fullName);
      setAvatar(response.data[0].avatar);
      setEmail(response.data[0].email);
      setPhone(response.data[0].phone);
      setStatus(response.data[0].status);
      setPersonalId(response.data[0].personalId);
      setStudentId(response.data[0].studentId);
      setData(response.data);
    };
    getDataUser();
  }, [token, isDisable]);
  const [listRequest, setListRequest] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getListRequest = async () => {
      try {
        const response = await PaymentAPI.getListRequest(page);
        setListRequest(response.data);
        setTotalPage(response.total);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getListRequest();
  }, [ page]);

  const [imageAvt, setImageAvt] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isImageChange, setIsImageChange] = useState(false);
  const handleImage = async (e) => {
    setIsImageChange(true);
    setImageAvt(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const TABLE_HEAD = [
    { id: "index", label: "#", align: "left" },
    { id: "price", label: "Số tiền giao dịch", align: "left" },
    { id: "note", label: "Nội dung", align: "left" },
    { id: "status", label: "Trạng thái", align: "left" },
  ];

  const handleUpdate = async () => {
    try {
      setIsDisable(false);
      if (isImageChange === true) {
        await CourseAPI.deleteImage(avatar)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const dataImage = new FormData();
        dataImage.append("file", imageAvt);
        const imageUrl = await CourseAPI.uploadImage(dataImage);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        UserAPI.editUser({
          id: user,
          fullName: fullName,
          email: email,
          phone: phone,
          avatar: imageUrl.data.data.url,
          personalId: personalId,
          studentId: studentId,
          status: status,
        });
        Swal.fire("Chỉnh sửa thành công!", "", "success").then(
          window.location.reload()
        );
      } else {
        UserAPI.editUser({
          id: user,
          fullName: fullName,
          email: email,
          phone: phone,
          avatar: avatar,
          personalId: personalId,
          studentId: studentId,
          status: status,
        });
        Swal.fire("Chỉnh sửa thành công!", "", "success").then(
          window.location.reload()
        );
      }
      setIsDisable(true);
    } catch (error) {
      Swal.fire("LỖi!", "Vui lòng thử lại sau", "error");
      console.log("Error:", error);
    }
  };
  return (
    <div className=" flex justify-center items-center bg-gradient-to-r from-[#DE640D] to-[#E8BA02]">
      {data
        ? data.map((a) => (
            <div className=" max-w-[1240px] p-4 grid grid-cols-3 gap-4">
              <div className="grid grid-rows-2">
                <img
                  src={avatar}
                  className="  lg:col-span-1 col-span-3 rounded-md shadow-inner"
                />
                <div>
                  {isDisable === true ? null : (
                    <>
                      {" "}
                      <h1 className="font-semibold">Tải ảnh đại diện</h1>
                      <input
                        type="file"
                        name="idCard"
                        onChange={handleImage}
                        required
                      />
                      {imageAvt ? <img src={imagePreview} /> : null}
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 bg-white px-8 py-8  rounded-md shadow-2xl">
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Thông tin cá nhân" value="1" />
                      {role !== "ADMIN" ? (
                        <Tab label="Đơn hàng của tôi" value="2" />
                      ) : null}
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    {" "}
                    <div className="font-bold text-xl md:text-2xl text-center">
                      <input
                        value={fullName}
                        disabled={isDisable}
                        className="text-center border"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="grid grid-rows-4 gap-4 items-center mt-4">
                        <div className="row-span-1">Email:</div>
                        <div className="row-span-1">Số điện thoại:</div>
                        {role === "TEACHER" ? (
                          <>
                            {" "}
                            <div className="row-span-1">CMND/CCCD:</div>
                            <div className="row-span-1">Thẻ sinh viên:</div>
                          </>
                        ) : null}
                      </div>
                      <div className="grid grid-rows-4 gap-4 col-span-2 mt-4">
                        <div className="flex items-center">
                          <input
                            value={email}
                            className="border-2 row-span-1 h-8 px-4 py-4"
                            disabled={isDisable}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            value={phone}
                            className="border-2 row-span-1 h-8 px-4 py-4"
                            disabled={isDisable}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>

                        {role === "TEACHER" ? (
                          <>
                            {" "}
                            <img
                              src={a.personalId}
                              className=" w-48 h-16 row-span-1"
                            />
                            <img
                              src={a.studentId}
                              className=" w-48 h-16 row-span-1"
                            />
                          </>
                        ) : null}
                      </div>
                    </div>
                    {isDisable === true ? null : (
                      <div className="flex space-x-4 justify-end">
                        <button
                          className="border-[#FED8D7] rounded-md px-2 py-2 bg-[#FED8D7] shadow-md"
                          onClick={() => setIsDisable(true)}
                        >
                          Huỷ
                        </button>
                        <button
                          className="border-[#D6E9FF] px-2 py-2 bg-[#D6E9FF] rounded-md shadow-md"
                          onClick={handleUpdate}
                        >
                          Lưu
                        </button>
                      </div>
                    )}
                    <div className="grid md:flex justify-between">
                      <button
                        onClick={() => setIsDisable(false)}
                        className="border-2 px-2 py-2 mt-8 border-[#006AF5] text-[#006AF5] rounded-md shadow-lg"
                      >
                        Chỉnh sửa thông tin
                      </button>

                      <button
                        onClick={() => alert("Cập nhật")}
                        className="border-2 px-2 py-2 mt-8 border-[#DE640D] text-[#DE640D] rounded-md shadow-lg"
                      >
                        Thay đổi mật khẩu
                      </button>
                    </div>
                  </TabPanel>
                  <TabPanel value="2">
                    {/* Số dư ví:{" "}
                    <div className="inline items-center  text-lg">
                      <Chip
                        label={`${numeral(a.balance).format("0,0")} VNĐ`}
                        color="error"
                        style={{ fontSize: "1.5rem", height: "3rem" }}
                      />
                    </div> */}
                    {role === "STUDENT" ? (
                      <>
                        {" "}
                        <div className="mt-2 font-semibold">
                          Danh sách thanh toán
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
                              {listRequest?.map((row, index) => (
                                <TableRow key={row.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                   <Chip label= {`${numeral(row.amount).format("0,0")} VNĐ`}/>
                                  </TableCell>
                                  <TableCell>{row.note}</TableCell>
                                  <TableCell>
                                    <Chip
                                      label={
                                        row.status === "APPROVED"
                                          ? "Hoàn tất"
                                          : row.status === "PENDING"
                                          ? "Đang xử lý"
                                          : "Từ chối"
                                      }
                                      color={
                                        row.status === "APPROVED"
                                          ? "success"
                                          : row.status === "PENDING"
                                          ? "warning"
                                          : "error"
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        {/* <button
                          onClick={() => setOpen(true)}
                          className="border-2 px-2 py-2 mt-8 border-[#E8BA02] text-[#E8BA02] rounded-md shadow-lg"
                        >
                          Yêu cầu nạp tiền
                        </button> */}
                        <Pagination
                          className="grid justify-items-center py-4"
                          count={Math.round(totalPage / 6) + 1}
                          variant="outlined"
                          boundaryCount={0}
                          onChange={(e, value) => setPage(value)}
                        />
                      </>
                    ) : null}
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          ))
        : null}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yêu cầu nạp tiền vào ví</DialogTitle>
        <DialogContent>
          <NumericFormat
            allowNegative={false}
            name="price"
            onValueChange={(e) => {
              setPrice(e.value);
            }}
            thousandSeparator=","
            customInput={TextField}
            label="Số tiền"
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Huỷ
          </Button>
          <Button onClick={handleRequest} variant="contained">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyProfile;
