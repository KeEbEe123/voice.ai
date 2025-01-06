import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Song from "./pages/Song";
import Final from "./pages/Final";
import Spline from "@splinetool/react-spline";
import PreLog from "./pages/PreLog";
import Login from "./pages/Login";
import About from "./pages/About";

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PreLog />} />
        <Route path="/home" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/song" element={<Song />} />
        <Route path="/final" element={<Final />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
