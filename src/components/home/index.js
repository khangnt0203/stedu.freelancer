import React from "react";
import FindBar from "./FindBar";
import Testimonials from "./Testimonials";

import Welcome from "./Welcome";
import Intro from "./Intro";
import { checkState, getToken } from "../../utils/authenticate";
function HomePage(props) {
  return (
  

    <div>
      <Welcome />
      <FindBar />
      <Intro />
      {/* <Testimonials /> */}
    </div>
  );
}

export default HomePage;
