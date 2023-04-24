import {
  AppBar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CartAPI from "../../utils/cart";
import numeral from "numeral";
import Swal from "sweetalert2";
import Bank from "../../images/mbbank.jpg";
import { PaymentAPI } from "../../utils/payment";
function ShoppingCart(props) {
  const [isRemove, setIsRemove] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderItems, setOrderItems] = useState();
  const [orderData, setOrderData] = useState();
  const [orderId, setOrderId] = useState();
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getMyCart = async () => {
      setIsLoading(true)
      try {
        const response = await CartAPI.getCart();
        setOrderItems(response.orderItems);
        setOrderData(response);
        setOrderId(response.id);
      } catch (error) {
        console.log("Error:", error);
      }
      setIsLoading(false)
    };
    getMyCart();
  }, [isRemove, isComplete]);
  const handleRemove = async (courseId) => {
    setIsRemove(true);
    try {
      await CartAPI.remove(courseId);
      Swal.fire("Thành công!", "Đã xoá khỏi giỏ hàng của bạn", "success");
    } catch (error) {
      Swal.fire("Lỗi!", "Vui lòng thử lại sau", "error");
      console.log("Error:", error);
    }
    setIsRemove(false);
  };
  const handlePayment = async () => {
    const params = { orderId: orderId, note: `Thanh toán - ${orderId}` };
    setIsComplete(false);
    try {
      await PaymentAPI.payment(params);
      setOpen(false);
      Swal.fire("Thành công", "", "success");
    } catch (error) {
      console.log("Error:", error);
    }
    setIsComplete(true);
  };

  return (
    <div className="max-w-[1240px] mx-auto lg:px-4 py-4 md:py-8">
      <h1 className="border-gray-500 bg-gray-200 py-2 px-4 font-semibold flex justify-center text-sm md:text-lg">
        THANH TOÁN CHO CÁC KHOÁ HỌC
      </h1>
      <div className="grid grid-cols-5 gap-2 mt-4">
        <div className="md:col-span-3 col-span-5 border-gray-200 border-[1px] py-4 px-4">
          <h1 className="font-bold flex justify-center text-xs md:text-base text-[#34a23d] border-b-2 border-[#34a23d]">
            CÁC KHOÁ HỌC ĐÃ CHỌN
          </h1>
          {isLoading === true ? (
        <div className="grid justify-items-center">
          {" "}
          <CircularProgress />
        </div>
      ) : null}
          <div>
            {orderItems?.length !== 0 ? (
              orderItems?.map((data) => (
                <div className="p-4 border-b border-gray-700">
                  <div className="grid grid-cols-4 ">
                    {/* <img
                      src={data.image}
                      className="md:w-32 md:h-32 w-20 h-24"
                    /> */}
                    <div className="col-span-3">
                      <h1 className="font-semibold text-blue-800 text-sm md:text-base">
                        {data.courseName}
                      </h1>

                      <h2 className=" text-blue-800 text-xs md:text-sm my-2">
                        {" "}
                        {data.subjectName}
                      </h2>
                      <div className="flex  text-xs md:text-sm mb-2">
                        Thời gian học:{" "}
                        <p className="ml-2 font-medium">
                          {data.duration}
                          {data.durationUnit === "WEEK" ? "tuần" : "tháng"}
                        </p>
                      </div>
                      <Chip
                        color="primary"
                        label={
                          <p className="font-semibold text-xs">
                            Giá: {numeral(data.price).format("0,0")} vnđ
                          </p>
                        }
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <IconButton onClick={() => handleRemove(data.courseId)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="grid text-lg md:text-xl  justify-center mt-4 text-center">
                <h1>Giỏ hàng bạn trống</h1>
                <a href="/course" className="text-base text-[#085E7D]">
                  Tìm kiếm khoá học
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-2 col-span-5 border-[#fefad7] border-[1px] py-4 px-4 bg-[#fefad7] h-64">
          <h1 className="font-bold flex justify-center text-xs md:text-base text-[#e89836] border-b-2 border-[#e89836]">
            THÀNH TIỀN
          </h1>
          {orderData ? (
            <>
              <div className="flex justify-between mt-2">
                <div>Tổng tiền:</div>
                <div className="font-bold ">
                  {numeral(orderData.totalAmount).format("0,0")} VNĐ
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div>Giảm giá:</div>
                <div className="font-bold ">
                  {numeral(orderData.discountAmount).format("0,0")} VNĐ
                </div>
              </div>
              <div className="flex justify-between mt-4 border-t-2 border-gray-900">
                <div>Thanh toán:</div>
                <div className="font-bold text-red-600 ">
                  {numeral(orderData.totalAmountReal).format("0,0")} VNĐ
                </div>
              </div>
            </>
          ) : null}

          {orderItems?.length !== 0 ? (
            <button
              className="bg-[#F8E000] rounded-md font-medium py-1 md:py-4 text-black w-full mt-8 shadow-inner"
              onClick={handleClickOpen}
            >
              Tiến hành thanh toán
            </button>
          ) : (
            <button
              disabled
              className="bg-slate-200 rounded-md font-medium py-1 md:py-4 text-black w-full mt-8 shadow-inner"
              onClick={handlePayment}
            >
              Tiến hành thanh toán
            </button>
          )}
        </div>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              THANH TOÁN ĐƠN HÀNG
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="max-w-[1240px] mx-auto mt-8 px-4">
          <div className="flex justify-between items-center">
            Vui lòng chuyển khoản đến Số tài khoản: HO LE ANH THU{" "}
            <img src={Bank} className="w-24" />
          </div>
          <div className="font-bold px-2 py-2 bg-slate-100 flex justify-between items-center rounded-lg text-lg">
            33888826266868{" "}
            <button className="border bg-white px-2 py-2 rounded-md font-thin">
              Sao chép
            </button>
          </div>
          <div className="mt-4">Nội dung thanh toán</div>
          <div className="font-bold px-2 py-2 bg-slate-100 flex justify-between items-center rounded-lg text-lg">
            Thanh toán - {orderId}
          </div>
          <div className="mt-4">Tổng số tiền</div>
          <div className="font-bold px-2 py-2 bg-slate-100 flex justify-between items-center rounded-lg text-lg">
            {numeral(orderData?.totalAmountReal).format("0,0")} VNĐ
          </div>

          <div className="mt-12 font-bold text-lg">
            Bạn đã hoàn tất việc thanh toán?
          </div>
          <div className="px-4 py-4 bg-slate-100 grid rounded-lg ">
            <div>
              Khi thanh toán thành công, bạn có thể xem Danh sách đơn đã mua
              thành công
            </div>
            <button
              className="px-2 py-2 border rounded-md bg-[#E8BA02] text-[#fcfcfc]"
              onClick={handlePayment}
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ShoppingCart;
