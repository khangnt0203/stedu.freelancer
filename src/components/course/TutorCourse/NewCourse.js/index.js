import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Editor from "../../../editor";
import CourseAPI from "../../../../utils/course";
import { getToken } from "../../../../utils/authenticate";
import jwtDecode from "jwt-decode";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";
function NewCourse(props) {
  const [listSubject, setListSubject] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  useEffect(() => {
    const getListSubject = async () => {
      const response = await CourseAPI.getListSubject("", page);
      setListSubject(response.data);
      setTotalPage(response.total);
    };
    getListSubject();
  }, [page]);

  const [name, setName] = useState();
  const [image, setImage] = useState();

  const [imagePreview, setImagePreview] = useState();
  const [subjectId, setSubjectId] = useState();
  const [description, setDescription] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [duration, setDuration] = useState();
  const [durationUnit, setDurationUnit] = useState("WEEK");
  const [price, setPrice] = useState();
  const token = getToken();
  const decode = jwtDecode(token);

  const onSubmit = async () => {
    try {
      const dataImage = new FormData();
      dataImage.append("file", image);
      const imageUrl = await CourseAPI.uploadImage(dataImage);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await CourseAPI.createCourse({
        name: name,
        description: description,
        shortDescription: shortDescription,
        image: imageUrl.data.data.url,
        subjectId: subjectId,
        teacherId: decode.id,
        duration: parseInt(duration),
        durationUnit: durationUnit,
        price: parseInt(price),
      });

      // Swal.fire("Tạo lớp thành công!", "Chúc bạn thành công!", "success").then(
      //   window.location.assign("/tutor/my-course")
      // );
      // window.location.assign("/tutor/my-course");
    } catch (error) {
      toast.error("Vui lòng thử lại sau!");
      console.log("Error:", error);
    }
  };
  const handleImage = async (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="max-w-[1240px] px-4 py-4 mx-auto">
      <div className="  font-bold text-xl md:text-2xl">Đăng ký lớp học</div>
      <ToastContainer />
      <div className="grid gap-2 mt-4">
        <TextField
          label="Tên lớp học"
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <h1 className="font-semibold">Chọn ảnh bìa</h1>
          <input type="file" name="file" onChange={handleImage} />
          {image ? <img src={imagePreview} /> : null}
        </div>

        <div>
          <h1 className="font-semibold">Mô tả lớp học</h1>
          <TextField
            rows={5}
            maxRows={5}
            fullWidth
            multiline
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>
        <div>
          <h1 className="font-semibold">Chi tiết lớp học</h1>
          <ReactQuill
            className="mb-16 md:mb-12"
            theme="snow"
            value={description}
            onChange={(e) => setDescription(e)}
            style={{ height: 200 }}
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Nhóm môn</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subjectId}
              label="Nhóm môn"
              onChange={(e) => setSubjectId(e.target.value)}
            >
              {listSubject?.map((row) => (
                <MenuItem value={row.id} key={row.id}>
                  {row.name}
                </MenuItem>
              ))}
              <Pagination
                className="grid justify-items-center"
                count={Math.round(totalPage / 6) + 1}
                variant="outlined"
                boundaryCount={0}
                onChange={(e, value) => setPage(value)}
              />
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <TextField
              label="Thời gian học"
              type="number"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="WEEK"
              name="radio-buttons-group"
              row
              onChange={(e) => setDurationUnit(e.target.value)}
            >
              <FormControlLabel value="WEEK" control={<Radio />} label="tuần" />
              <FormControlLabel
                value="MONTH"
                control={<Radio />}
                label="tháng"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <NumericFormat
          allowNegative={false}
          name="price"
          onValueChange={(e) => {
            setPrice(e.value);
          }}
          thousandSeparator=","
          customInput={TextField}
          label="Phí đăng ký"
          InputProps={{
            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
          }}
        />
        <div className="flex flex-row-reverse">
          <Button variant="contained" onClick={onSubmit}>
            Lưu
          </Button>
          <Button
            variant="outlined"
            onClick={() => window.location.assign("/tutor/my-course")}
          >
            Huỷ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewCourse;
