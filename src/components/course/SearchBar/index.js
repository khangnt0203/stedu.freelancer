import React from "react";

import ReactTyped from "react-typed";
import NewGif from "../../../images/new.gif";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
function SearchBar(props) {
  return (
    <div className=" border-2 py-4  md:pl-32 md:flex bg-[#fff] md:z-50 ">
      <div>
        <ReactTyped
          className="text-base font-bold md:pl-4 pl-2"
          strings={["Tìm khoá học mong muốn"]}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
        <div className="flex items-center">
          <img src={NewGif} className="w-20 h-10" />
          <h1 className="text-xs md:text-base font-semibold text-red-500 mb-2">
            {" "}
            Nhận ngay ưu đãi 5% khi đăng ký từ 2 khoá học trở lên!
          </h1>
        </div>
      </div>
      <div className=" mx-auto">
        <div className="relative flex">
          <input
            placeholder="Tên khoá học..."
            className="py-4 px-4 rounded-xl pl-12 bg-[#f3f3f3]"
          />

          <span className="absolute inset-y-0 flex items-center">
            <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out">
              <SearchIcon />
            </button>
          </span>
          {/* <IconButton>
      
        </IconButton> */}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
