import React, { useEffect, useState } from "react";
import { CommentAPI } from "../../utils/comment";
import { Pagination } from "@mui/material";

function CommentList({ courseId }) {
  const [listData, setListData] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const getListComment = async () => {
      try {
        const response = await CommentAPI.getListComment(courseId, page);
        setListData(response.data);
        setTotalPage(response.total);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getListComment();
  }, [courseId]);
  return (
    <div>
      <h1 className="text-base lg:text-lg font-semibold text-blue-800 mt-2">
        Đánh giá khoá học
      </h1>
      <div className=" grid">
        {listData?.length !== 0 ? (
          listData?.map((data) => (
            <>
              <div className="font-semibold mt-2">{data.studentName}:</div>
              <div className="ml-2">{data.content}</div>
            </>
          ))
        ) : (
          <div>Khoá học chưa nhận được đánh giá nào!</div>
        )}
        {totalPage !== 0 ? (
          <Pagination
            className="grid justify-items-center py-4"
            onChange={(e, newValue) => setPage(newValue)}
            count={Math.round(totalPage / 6) + 1}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CommentList;
