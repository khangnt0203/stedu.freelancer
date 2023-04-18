import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { PaymentAPI } from "../../utils/payment";
import Swal from "sweetalert2";

function ManageDepositRequest(props) {
  const TABLE_HEAD = [
    { id: "index", label: "#", align: "left" },
    { id: "price", label: "Số tiền giao dịch", align: "left" },
    { id: "id", label: "ID Người yêu cầu", align: "left" },
    { id: "note", label: "Nội dung", align: "left" },
    { id: "status", label: "Trạng thái", align: "left" },
  ];
  const [isCompelete, setIsComplete] = useState(false);
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
  }, [isCompelete, page]);

  const handleRequest = async (userId, status) => {
    try {
      await PaymentAPI.processRequest(userId, status);
      Swal.fire("Hoàn tất", "", "success");
      setIsComplete(true);
    } catch (error) {
      Swal.fire("Lỗi", "Vui lòng thử lại sau", "error");
      console.log("Error:", error);
    }
    setIsComplete(false);
  };

  return (
    <div>
      <h1 className="font-semibold my-4">DANH SÁCH THANH TOÁN</h1>
      <div className="overflow-y-auto">
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
                  <Chip label={`${numeral(row.amount).format("0,0")} VNĐ`} />
                </TableCell>
                <TableCell>{row.userId}</TableCell>
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
        <Pagination
          className="grid justify-items-center py-4"
          count={Math.round(totalPage / 6) + 1}
          variant="outlined"
          boundaryCount={0}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
}

export default ManageDepositRequest;
