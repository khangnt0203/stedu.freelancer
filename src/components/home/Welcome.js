import React from "react";
import LearnBackground from "../../images/learning_background.jpg";
import Feature1BgImg from "../../images/feature2_bg.png";
import ReactTyped from "react-typed";
import BgMain from "../../images/bgmain.png";
function Welcome(props) {
  return (
    <section
      className="py-16 md:py-56 md:px-8 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${BgMain})` }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          {/* text */}
          <div className="py-6 xl:py-12 text-center xl:text-left">
            <h2
              className="h2 mb-5 text-3xl md:text-5xl font-bold "
              data-aos="fade-up"
              data-aos-delay="300"
            >
              STEDU
            </h2>

            <ReactTyped
              className="lead text-lg md:text-xl z-10 "
              data-aos="fade-up"
              strings={["   Trải nghiệm mới, việc học trở nên đơn giản hơn!"]}
              typeSpeed={80}
              backSpeed={80}
              loop
            />
          </div>

          <div className=" absolute w-[50%]">
            <img src={Feature1BgImg} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
