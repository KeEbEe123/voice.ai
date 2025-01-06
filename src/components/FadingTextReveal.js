import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FadingTextReveal = ({ text }) => {
  const textRef = useRef();

  useEffect(() => {
    const letters = textRef.current.querySelectorAll(".letter");
    gsap.fromTo(
      letters,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 1, ease: "power3.out" }
    );
  }, [text]);

  return (
    <div ref={textRef} style={{ display: "flex", overflow: "hidden" }}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className="letter"
          style={{ display: "inline-block" }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div style={{ fontSize: "2rem", fontFamily: "Arial, sans-serif" }}>
      <FadingTextReveal text="Hello GSAP in React" />
    </div>
  );
};

export default App;
