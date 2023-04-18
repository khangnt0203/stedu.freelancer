import {
  Breadcrumbs,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
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
import { useParams } from "react-router-dom";
function EditCourse(props) {
  const [listSubject, setListSubject] = useState();
  useEffect(() => {
    const getListSubject = async () => {
      const response = await CourseAPI.getListSubject("");
      setListSubject(response.data);
    };
    getListSubject();
  }, []);

  const [name, setName] = useState();
  const [image, setImage] = useState();

  const [imagePreview, setImagePreview] = useState();
  const [subjectId, setSubjectId] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [durationUnit, setDurationUnit] = useState("WEEK");
  const [isImageChange, setIsImageChange] = useState(false);
  const [price, setPrice] = useState();
  const token = getToken();
  const decode = jwtDecode(token);
  const [subjectName, setSubjectName] = useState();
  const [shortDescription, setShortDescription] = useState();
   const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const onSubmit = async () => {
    try {
    
      if (isImageChange === true) {
        await CourseAPI.deleteImage(image)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const dataImage = new FormData();
        dataImage.append("file", image);
        const imageUrl = await CourseAPI.uploadImage(dataImage);
        await new Promise((resolve) => setTimeout(resolve, 2000));
       await CourseAPI.editCourse({
          id: id.id,
          name: name,
          shortDescription: shortDescription,
          description: description,
          image: imageUrl.data.data.url,
          subjectId: subjectId,
          duration: parseInt(duration),
          durationUnit: durationUnit,
          price: parseInt(price),
          status: "ACTIVE",
        });
        Swal.fire(
          "Chỉnh sửa lớp thành công!",
          "Chúc bạn thành công!",
          "success"
        ).then(window.location.assign("/tutor/my-course"));
      } else {
        await CourseAPI.editCourse({
          id: id.id,
          name: name,
          shortDescription: shortDescription,
          description: description,
          image: image,
          subjectId: subjectId,
          duration: parseInt(duration),
          durationUnit: durationUnit,
          price: parseInt(price),
          status: "ACTIVE",
        });
        Swal.fire(
          "Chỉnh sửa lớp thành công!",
          "Chúc bạn thành công!",
          "success"
        ).then(window.location.assign("/tutor/my-course"));
      }
      // window.location.assign("/tutor/my-course");
    } catch (error) {
      toast.error("Vui lòng thử lại sau!");
      console.log("Error:", error);
    }
  };
  const handleImage = async (e) => {
    setIsImageChange(true);
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const id = useParams();
  useEffect(() => {
    const getCourseById = async () => {
      const response = await CourseAPI.getCourse(id.id);
      setName(response.data[0].name);
      setImage(response.data[0].image);
      setShortDescription(response.data[0].shortDescription);
      setDescription(response.data[0].description);
      setSubjectId(response.data[0].subjectId);
      setDuration(response.data[0].duration);
      setDurationUnit(response.data[0].durationUnit);
      setPrice(response.data[0].price);
    };
    getCourseById();
  }, [id]);
  useEffect(() => {
    const getSubject = async () => {
      const response = await CourseAPI.getSubjectById(subjectId);
      setSubjectName(response.data[0].name);
    };
    
    getSubject();
  }, [subjectId]);
    useEffect(() => {
    const getListSubject = async () => {
      const response = await CourseAPI.getListSubject("", page);
      setListSubject(response.data);
      setTotalPage(response.total);
    };
    getListSubject();
  }, [page]);

  return (
    <div className="max-w-[1240px] px-4 py-4 mx-auto">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/tutor/my-course">
          Quản lý lớp học
        </Link>

        <Typography color="text.primary">Chỉnh sửa lớp học</Typography>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>

      <div className="  font-bold text-xl md:text-2xl">Chỉnh sửa lớp học</div>
      <ToastContainer />
      <div className="grid gap-2 mt-4">
        <TextField onChange={(e) => setName(e.target.value)} value={name} />
        <div>
          <h1 className="font-semibold">Chọn ảnh bìa</h1>
          <input type="file" name="file" onChange={handleImage} />
          {image && isImageChange === true ? <img src={imagePreview} /> : <img src={image}/>}
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {subjectName ? subjectName : null}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subjectId}
            defaultValue={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            {listSubject?.map((row) => (
              <MenuItem value={row.id} key={row.id}>
                {row.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="flex items-center">
          <div className="mr-4">
            <TextField
              type="number"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            />
          </div>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="WEEK"
              name="radio-buttons-group"
              row
              onChange={(e) => setDurationUnit(e.target.value)}
              value={durationUnit}
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
          value={price}
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

export default EditCourse;
