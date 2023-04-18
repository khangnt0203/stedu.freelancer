import React from "react";
import Help from "../../images/help.jpg";
import Feature1BgImg from "../../images/feature4_bg.png";
import ReactTyped from "react-typed";
function Contact(props) {
  return (
    <section
      data-aos="fade-up"
      className="py-16 md:py-48 md:px-8  max-w-[1440px] mx-auto"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          {/* text */}
          <div className="py-6 xl:py-12 text-center xl:text-left">
            <h2
              className="h2 mb-5 text-3xl md:text-5xl font-bold"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Liên hệ với chúng tôi
            </h2>

            <div
              className="text-lg md:text-xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="inline">
                Hotline: <a href="tel:0984989079">0984989079</a> –{" "}
                <a href="tel:0926666563">0926666563</a> -{" "}
                <a href="tel:0357724918">0357724918</a>
              </div>
              <div>
                Email :{" "}
                <a
                  href="mailto:studywithSTEDU@gmail.com"
                  className="text-green-700 font-semibold"
                >
                  {" "}
                  studywithSTEDU@gmail.com
                </a>{" "}
              </div>
            </div>
          </div>

          <div className=" absolute w-full -z-10">
            <img src={Feature1BgImg} />
          </div>
          <img src={Help} className="w-[55%] md:w-[35%] rounded-3xl " />
        </div>
      </div>
    </section>
  );
}

export default Contact;
