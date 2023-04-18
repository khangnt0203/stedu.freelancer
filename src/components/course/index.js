import React, { useState } from "react";
import DetailCourse from "./DetailCourse";
import ListCategory from "./ListCategory";
import ListCourse from "./ListCourse";

import SearchBar from "./SearchBar";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function Course(props) {
  const [filterSubject, setFilterSubject] = useState();
  const handleFilterSubject = (subject) => {
    setFilterSubject(subject);
  };
  const [filterName, setFilterName] = useState();
  return (
    <div>
      {/* <SearchBar /> */}

      <div className="max-w-[1440px] mx-auto lg:px-4 py-8">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-5 lg:col-span-1 sticky top-0   z-40 lg:z-0">
            <ListCategory filterSubject={handleFilterSubject} />
          </div>
          <div className="col-span-5 lg:col-span-4 px-8  ">
            <div className="grid justify-items-end mb-2 lg:mb-0">
              <TextField
                variant="outlined"
                className="bg-white"
                placeholder="Tên khoá học..."
                sx={{ width: 320 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <ListCourse filterSubject={filterSubject} filterClassName={filterName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
