import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import ChordDisplay from "../components/ChordDisplay";
import Search from "../components/Search";
import Transpose from "../components/Transpose";

import React from "react";

function Song() {
  return (
    <div>
      <Navbar />
      <Search />
      <ChordDisplay />
      <Transpose />
    </div>
  );
}

export default Song;
