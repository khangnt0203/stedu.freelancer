import React from "react";
import AboutImg from "../../images/aboutus.jpg";
import About from "./about";
import Contact from "./contact";
import Feature from "./feature";
function AboutUs(props) {
  return (
   <div className="mx-auto max-w-[1440px]">
    <About/>
    <Feature/>
    <Contact/>
   </div>
  );
}

export default AboutUs;
