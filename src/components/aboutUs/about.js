import React from "react";
import AboutImg from "../../images/aboutus.jpg";
function About(props) {
  return (
    <section className="my-[30px] " data-aos="fade-up" data-aos-offset="350">
      <div className="container">
        <div className="bg-[#FDFDBD]/[35%] rounded-[50px] min-h-[560px] px-12 pb-12 flex flex-col text-center xl:flex-row xl:items-center xl:text-left  xl:gap-x-[60px] xl:pb-0">
          {/* image */}
          <div className="flex-1" data-aos="zoom-in-left">
            <img src={AboutImg} alt="" />
          </div>
          {/* text */}
          <div className="flex-1 xl:pr-12">
            <h2
              className="h2 mb-10 font-bold text-2xl md:text-4xl"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              VỀ CHÚNG TÔI
            </h2>
            <p
              className="max-w-[474px] mx-auto xl:mx-0 text-lg md:text-xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              STEDU là đơn vị trực thuộc công ty TNHH TTA – là một nền tảng kết
              nối trực tuyến giữa sinh viên giỏi muốn trải nghiệm giảng dạy và
              sinh viên yếu kém có nhu cầu học kèm. Sinh viên có thể chủ động
              lựa chọn những gì muốn học, khám phá các khóa học chuyên sâu giúp
              họ vượt qua áp lực để đạt mục tiêu học tập, công việc.
              {/* Sinh viên có thể chủ động lựa chọn những gì muốn học, khám phá các khóa
              học chuyên sâu giúp họ vượt qua áp lực để đạt mục tiêu học tập,
              công việc. STEDU mang tới sự trải nghiệm mới, giúp việc học trở
              nên dễ dàng hơn. */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
