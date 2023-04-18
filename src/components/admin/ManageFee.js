import React, { useEffect, useState } from "react";
import { PaymentAPI } from "../../utils/payment";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

function ManageFee(props) {
  const [fee, setFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true)
  useEffect(() => {
    const getFeeConfig = async () => {
      const response = await PaymentAPI.getFeeConfig();
      setFee(response[0].value);
      setDiscount(response[1].value)
    };
    getFeeConfig();
  }, []);
  const handleSubmitFee = async () =>{
try {
 await PaymentAPI.updateFeeConfig(fee);
 Swal.fire("Thành công","","success")
 setIsHidden(true)
} catch (error) {
  Swal.fire("Lỗi", "Vui lòng thử lại sau", "error")
  console.log("Error:", error)
}

  }
  const handleSubmitDiscount = async () =>{
    try {
     await PaymentAPI.updateDiscountConfig(discount);
     Swal.fire("Thành công","","success")
     setIsHidden2(true)
    } catch (error) {
      Swal.fire("Lỗi", "Vui lòng thử lại sau", "error")
      console.log("Error:", error)
    }
    
      }
  return (
    <div>
      <h1 className="my-4 font-semibold">
        CẤU HÌNH PHÍ DỊCH VỤ
      </h1>
      <div className="flex">
        <div>Mức thu phí hiện tại:</div>
        <div className="font-semibold ml-2 text-red-700">{fee ? fee : 0}%</div>
      </div>
      <div>
        {isHidden === true ? null : <TextField onChange={(e)=>setFee(e.target.value)} placeholder="Nhập mức giảm giá" type="number" />}
        {isHidden === true ? (
          <Button variant="outlined" onClick={() => setIsHidden(false)}>
            Thay đổi
          </Button>
        ) : (
          <>
            {" "}
            <Button variant="outlined" onClick={() => setIsHidden(true)}>
              Huỷ
            </Button>{" "}
            <Button variant="contained" color="success" onClick={handleSubmitFee}>
              Lưu
            </Button>
          </>
        )}
      </div>
      <div className="flex">
        <div>Mức giảm giá hiện tại:</div>
        <div className="font-semibold ml-2 text-red-700">{discount ? discount : 0}%</div>
        {console.log(fee)}
      </div>
      <div>
        {isHidden2 === true ? null : <TextField onChange={(e)=>setDiscount(e.target.value)} placeholder="Nhập mức thu phí" type="number" />}
        {isHidden2 === true ? (
          <Button variant="outlined" onClick={() => setIsHidden2(false)}>
            Thay đổi
          </Button>
        ) : (
          <>
            {" "}
            <Button variant="outlined" onClick={() => setIsHidden2(true)}>
              Huỷ
            </Button>{" "}
            <Button variant="contained" color="success" onClick={handleSubmitDiscount}>
              Lưu
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ManageFee;
