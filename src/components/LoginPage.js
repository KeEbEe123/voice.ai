import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Home from "../pages/Home";
import Navbar from "./Navbar";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      setPicture(data.user.photoURL);
      localStorage.setItem("picture", data.user.photoURL);
      setName(data.user.displayName);
      localStorage.setItem("name", data.user.displayName);
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });
  console.log(picture);
  return (
    <>
      {value ? (
        <Home data={picture} name={name} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold text-center mb-8">Login</h2>
            <button
              onClick={handleClick}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full mb-4"
            >
              Login with Google
            </button>
            <p className="text-sm text-gray-400 text-center">or</p>
            <form className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-700 text-white w-full py-2 px-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-700 text-white w-full py-2 px-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <a href="#" className="text-red-500 hover:text-red-600">
                Sign up
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
