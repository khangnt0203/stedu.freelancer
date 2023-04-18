import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CourseAPI from "../../../utils/course";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export default function ListCategory({ filterSubject }) {
  const [listSubject, setListSubject] = React.useState();
  const [subject, setSubject] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState()
  React.useEffect(() => {
    const getListSubject = async () => {
      try {
        const response = await CourseAPI.getListSubject(subject,page);
        setListSubject(response.data);
        setTotalPage(response.total)
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getListSubject();
  }, [subject, page]);
  return (
    <div className="py-2 px-2 lg:shadow-inner shadow-lg  lg:py-0 md:px-0 bg-slate-100 rounded-md ">
      <div className="grid justify-items-center">
        <h1 className="font-semibold mt-2">LOẠI MÔN HỌC</h1>

        <div className="relative xl:flex hidden">
          <input
            placeholder="Tên môn học..."
            className="py-4 px-4 rounded-xl pl-12 "
            onChange={(e) => setSubject(e.target.value)}
          />

          <span className="absolute inset-y-0 flex items-center">
            <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out">
              <SearchIcon />
            </button>
          </span>
        </div>
      </div>
      <div className="hidden lg:inline overflow-y-auto h-[120px]  px-2">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="all"
            name="radio-buttons-group"
            onChange={(e) => filterSubject(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="Tất cả" />

            {listSubject?.map((data) => (
              <FormControlLabel
                key={data.id}
                value={data.id}
                control={<Radio />}
                label={data.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Pagination   className="grid justify-items-center py-4"
          count={Math.round(totalPage / 11) + 1}
          variant="outlined"
          boundaryCount={0}
          onChange={(e, value) => setPage(value)}/>
      </div>
      <div className="lg:hidden mt-4 overflow-y-auto px-4 py-4 ">
        <FormControl fullWidth>
          <Select
          className="bg-white"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            defaultValue={'all'}
            onChange={(e) => filterSubject(e.target.value)}
          >
              <MenuItem key={'all'} value={'all'}>
                Tất cả
              </MenuItem>
            {listSubject?.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.name}
              </MenuItem>
            ))}
                <Pagination   className="grid justify-items-center py-4"
          count={Math.round(totalPage / 11) + 1}
          variant="outlined"
          boundaryCount={0}
          onChange={(e, value) => setPage(value)}/>
          </Select>
      
        </FormControl>
    
      </div>
    </div>
  );
}
