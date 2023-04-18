import React from "react";
import Intro1 from "../../images/intro1.png";
import Intro2 from "../../images/intro2.png";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function Intro(props) {
  // tạo danh sách carousel thủ công và tĩnh
  const images = [
    {
      title:'Trường quân đội lên phương án tổ chức kỳ thi riêng ',
      imgPath:
        "https://i1-vnexpress.vnecdn.net/2023/04/06/Cuc-Nha-truong-JPEG-9602-1680775203.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=hAuEMDD-Xv1hs5xp5bsBOg",
        link:'https://vnexpress.net/truong-quan-doi-len-phuong-an-to-chuc-ky-thi-rieng-4590362.html'
    },
    {
      title:'Học viện Ngân hàng mở bốn chương trình mới',
      imgPath:
        "https://i1-vnexpress.vnecdn.net/2023/03/28/HV-Ngan-hang-8248-1679978243.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=vbYtf-OClZAMnJyT8KhnVg",
        link:'https://vnexpress.net/hoc-vien-ngan-hang-mo-bon-chuong-trinh-moi-4586383.html'
    },
    {
      title:'9x chia sẻ chuyện nghề chăm sóc học viên trực tuyến',
      imgPath:
        "https://i1-vnexpress.vnecdn.net/2023/03/17/image001-7398-1679040957.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=J6n90EG7mYaPfge-wXhlbg",
        link:'https://vnexpress.net/9x-chia-se-chuyen-nghe-cham-soc-hoc-vien-truc-tuyen-4582407.html'
    },
    {
      title:'Nữ giảng viên nâng cao nghiệp vụ nhờ hỗ trợ học viên online',
      imgPath:
        "https://i1-vnexpress.vnecdn.net/2023/01/10/mentor-1490-1673319739.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=NtIYdr6aGfkw9SrD9tVNTA",
        link:'https://vnexpress.net/nu-giang-vien-nang-cao-nghiep-vu-nho-ho-tro-hoc-vien-online-4557113.html'
    },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div
      className="grid grid-cols-3 gap-4 md:mt-20 mt-8 px-4"
      data-aos="fade-up"
      data-aos-delay="600"
    >
      <div className="col-span-2 ">
        <Box>
          <div className="text-xs md:text-lg font-semibold cursor-pointer mx-4"    onClick={()=>window.open(images[activeStep].link)}>
          {images[activeStep].title}
          </div>
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      display: "block",
                      minHeight: 120,
                      maxHeight: 500,
                      width: "100%",
                  borderRadius:'20px'
                    }}
                    src={step.imgPath}
                    alt={step.title}
                 
                    
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          />
        </Box>
      </div>
      <div className="col-span-1">
        <div className="grid grid-rows-1 gap-2 mt-8">
          <div
            onClick={() => window.location.assign("/sign-up-student")}
            className="cursor-pointer hover:scale-90 ease-in-out duration-200 hover:shadow-2xl"
          >
            <img src={Intro1} className="rounded-xl shadow-inner"/>
          </div>
          <div
            onClick={() => window.location.assign("/sign-up-tutor")}
            className="cursor-pointer hover:scale-90 ease-in-out duration-200 hover:shadow-2xl" 
          >
            <img src={Intro2} className="rounded-xl shadow-inner"/>
          </div>
          <div
            onClick={() => window.location.assign("/sign-up-tutor")}
            className="lg:hidden cursor-pointer hover:scale-90 ease-in-out duration-200 hover:shadow-2xl" 
          >
            <img src={Intro2} className="rounded-xl shadow-inner"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
