import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
const testimonialsData = [
  {
    image: "https://s3-hcm-r1.longvan.net/19413938-stedu-service/1680934372-download.jpeg",
    name: "Phạm Hoàng Vỹ",
    major: "Gia sư môn Lý",
    message: "Mình suy nghĩ rằng, giúp nhau học tập sẽ cùng nhau tiến bộ! Hãy cùng nhau cố gắng",
    delay: "300",
  },
  {
    image: "https://s3-hcm-r1.longvan.net/19413938-stedu-service/1680720015-avt.jpg",
    name: "Nguyễn Trần Khang",
    major: "Gia sư môn báo",
    message: "Mình rất tâm đắt câu: Học thầy không tày học bạn. Mong rằng mình có thể chia sẻ với các bạn thật nhiều.",
    delay: "600",
  },
  {
    image: "https://s3-hcm-r1.longvan.net/19413938-stedu-service/1681041583-avt3.jpg",
    name: "Văn Đức Hoàng",
    major: "Gia sư môn ngủ",
    message: "Mình thấy rằng STEDU là cầu nối giúp mình có thể chia sẻ với các sinh viên, không chỉ ở một trường duy nhất, mà đó là cầu nối giúp các bạn trên toàn quốc!",
    delay: "900",
  },
];
function Testimonials(props) {
  return (
    <section className="relative  md:mt-0">
      <div className="container-fluid mx-auto">
        <div
          className=" min-h-[400px]"
          data-aos="fade-up"
          data-aos-offset="600"
        >
          <div className="flex flex-col justify-center px-2 xl:px-0 h-[800px]">
            <h2 className="text-[#084594] font-bold text-xl md:text-2xl text-center mb-[80px]">
              GIA SƯ STEDU MÁCH BẠN
            </h2>
            <Swiper
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {testimonialsData.map((slide, index) => {
                // destructure slide
                const { image, message, name, major, delay } = slide;
                return (
                  // slide
                  <SwiperSlide
                    key={index}
                    className="bg-[#fcfdd5] rounded-[20px] border border-accent-primary xl:max-w-[545px] max-h-[250px] pt-[60px] px-[35px] xl:px-[70px] pb-[50px] flex items-start gap-x-[30px] shadow-xl"
                  >
                    {/* avatar image */}
                <div className="grid grid-cols-3 lg:gap-2">
                <img src={image} alt="" className="rounded-full w-32 h-32" />
                    {/* text */}
                    <div className="col-span-2">
                      <div className="text-lg text-primary font-bold">
                        {name}
                      </div>
                   
                      <p className="max-w-[240px] mt-2 italic">{message}</p>
                    </div>
                </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
