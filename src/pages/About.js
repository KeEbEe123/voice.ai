import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import TestimonialSection from "../components/TestimonialSection";
import TutorialSection from "../components/TutorialSection";
import Sphere from "../components/Sphere";

import React from "react";
import Why from "../components/Why";

function About(props) {
  return (
    <div>
      <Navbar data={props.data} />
      <Why />
      <TutorialSection />
      <TestimonialSection />
    </div>
  );
}

export default About;
