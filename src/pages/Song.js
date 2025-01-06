import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import ChordDisplay from "../components/ChordDisplay";
import Search from "../components/Search";
import Transpose from "../components/Transpose";

import React from "react";
import ChordSelector from "../components/ChordSelector";
import FadingTextReveal from "../components/FadingTextReveal";

function Song() {
  return (
    <div>
      <Navbar />
      <Search />
    </div>
  );
}

export default Song;
