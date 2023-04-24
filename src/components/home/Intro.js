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
      title:'Đại học Văn Lang: Hồi trống vang, Văn Lang chuyển mình',
      imgPath:
        "https://i.doanhnhansaigon.vn/2022/12/22/-3760-1671701006.jpg",
        link:'https://doanhnhansaigon.vn/giao-duc/dai-hoc-van-lang-hoi-trong-vang-van-lang-chuyen-minh-1115055.html?fbclid=IwAR1jqyOPAQGBxf-cyL7-oK98h2ZfBLKrvh473dRsASjiz0-PgAq6S34kwfw'
    },
    {
      title:'Trường ĐH Văn Lang ghi dấu ấn tại Hội nghị Triển lãm Giáo dục Quốc tế APAIE',
      imgPath:
        "https://images2.thanhnien.com.vn/thumb_w/640/528068263637045248/2023/3/20/img8588-16792839748111406203838.jpg",
        link:'https://thanhnien.vn/truong-dh-van-lang-ghi-dau-an-tai-hoi-nghi-trien-lam-giao-duc-quoc-te-apaie-185230320105222132.htm?fbclid=IwAR05nvxpBcu2Sf24m1slTWPcYeM-T7jTymG5GZjI6kmxWSjGJymyzsSLDk0'
    },
    {
      title:'Giới trẻ hào hứng bắt đầu hành trình đại học với Open Day tại Trường Đại học Văn Lang',
      imgPath:
        "https://kenh14cdn.com/thumb_w/800/pr/2023/photo1679457482312-1679457483434186343346-63815083378977.jpg",
        link:'https://kenh14.vn/gioi-tre-hao-hung-bat-dau-hanh-trinh-dai-hoc-voi-open-day-tai-truong-dai-hoc-van-lang-20230322120258825.chn'
    },
    {
      title:'Trường Đại học Văn Lang chuyển mình với định vị đại học Việt Nam chuẩn quốc tế',
      imgPath:
        "https://images.hcmcpv.org.vn/res/news/2022/12/22-12-2022-truong-dai-hoc-van-lang-chuyen-minh-voi-dinh-vi-dai-hoc-viet-nam-chuan-quoc-te-7ED51EDC-details.jpg?vs=22122022072338",
        link:'https://www.hcmcpv.org.vn/tin-tuc/truong-dai-hoc-van-lang-chuyen-minh-voi-dinh-vi-dai-hoc-viet-nam-chuan-quoc-te-1491902914?fbclid=IwAR0IiFF-D0fbh1XGVJeYUII4OfXax85m2V9scAjo03-D2j5iPQtw3UsVfIQ'
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
      className="grid grid-cols-3 gap-4 md:mt-20 mt-8 lg:px-32 px-4 lg:py-16"
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
                  onClick={()=>window.open(step.link)}
                    component="img"
                    sx={{
                      display: "block",
                      minHeight: 120,
                      maxHeight: 500,
                    
                  borderRadius:'20px'
                    }}
                    src={step.imgPath}
                    alt={step.title}
                 
                    
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          {/* <MobileStepper
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
          /> */}
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
        
        </div>
      </div>
    </div>
  );
}

export default Intro;
