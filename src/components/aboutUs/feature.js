import React from "react";
import Feature1 from "../../images/learning1.jpg";
import Feature2 from "../../images/learning2.jpg";
import Feature3 from "../../images/learning3.jpg";
import Feature4 from "../../images/learning4.jpg";
import Feature1BgImg from "../../images/feature1_bg.png";
import Feature2BgImg from "../../images/feature2_bg.png";
import Feature3BgImg from "../../images/feature3_bg.png";
import Feature4BgImg from "../../images/feature4_bg.png";
function Feature(props) {
  const featuresData = {
    title: "Sứ mệnh",
    subtitle:
      "STEDU ra đời với sứ mệnh trở thành cầu nối giữa các sinh viên giỏi và các sinh viên cần bổ trợ kiến thức. Tạo môi trường và công cụ giúp các bạn có trải nghiệm học thông minh, hiệu quả, tiện lợi, để đạt những mục tiêu như kì vọng. Tạo điều kiện, cơ hội việc làm cho các bạn sinh viên thoả mãn đam mê giảng dạy và kiếm thêm thu nhập. Làm cho việc dạy cũng như học trở nên dễ dàng và thú vị với tất cả sinh viên.",
    list: [
      {
        image: Feature1,
        bgImage: Feature1BgImg,
        title: "Đa dạng môn học",
        description: "Với nhiều khoá học dễ dàng cho các bạn dễ dàng lựa chọn",

        delay: "400",
      },
      {
        image: Feature2,
        bgImage: Feature2BgImg,
        title: "Cộng đồng lớn",
        description: "Môi trường năng động, kết nối nhiều sinh viên",
        linkText: "Learn more",
        delay: "700",
      },
      {
        image: Feature3,
        bgImage: Feature3BgImg,
        title: "Chi phí phù hợp",
        description: "Có nhiều mức học phí để sinh viên lựa chọn. Mức học phù hợp với điều kiện sinh viên nhưng vẫn đảm bảo chất lượng giảng dạy.",
        linkText: "Learn more",
        delay: "1000",
      },
      {
        image: Feature4,
        bgImage: Feature4BgImg,
        title: "Tiết kiệm thời gian",
        description: "Có thể điều chỉnh thời gian một cách hợp lý.",
        linkText: "Learn more",
        delay: "1300",
      },
    ],
  };
  return (
    <section className="my-[70px] xl:my-[150px]">
      <div className="container mx-auto">
        {/* text */}
        <div className="text-center">
          <h2
            className="h2 mb-6 xl:mb-8 text-2xl md:text-4xl font-bold"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            {featuresData.title}
          </h2>
          <p
            className="lead max-w-[584px] mx-auto mb-16 xl:mb-20 text-lg md:text-xl"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            {featuresData.subtitle}
          </p>
        </div>
        {/* feature list */}
        <div className="grid grid-cols-1 gap-[50px] xl:grid-cols-2">
          {featuresData.list.map((feature, index) => {
            // destructure feature
            const { image, bgImage, title, description, linkText, delay } =
              feature;
            // feature item
            return (
              <div
                key={index}
                className="w-full max-w-[530px] h-[358px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto"
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-delay={delay}
              >
                {/* bg image */}
                <div className="flex absolute top-0 right-0 -z-10">
                  <img src={bgImage} />
                </div>

                {/* icon image */}
                <div
                  className="max-w-[180px] xl:mr-7 md:max-w-[260px]"
                  data-aos="zoom-in-right"
                  data-aos-delay={delay}
                >
                  <img src={image} className="rounded-2xl" />
                </div>
                {/* text */}
                <div className="max-w-[220px]">
                  <h3 className="h3 mb-4 font-semibold md:text-xl text-lg">
                    {title}
                  </h3>
                  <p className="font-light italic mb-4 md:text-lg text-base">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Feature;
