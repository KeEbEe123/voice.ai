import React from "react";
import Icon from "../images/logo4.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Record from "../pages/Record";
import Song from "../pages/Song";
import Home from "../pages/Home";

const Navbar = (props) => {
  const userData = {
    avatarUrl: localStorage.getItem("picture"), // Replace with the actual user's avatar URL
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
    console.log("Logout clicked");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="h-12">
              <img className="h-10 w-auto" src={Icon} alt="Discord Logo" />
            </Link>
          </div>
          <div className="flex">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/home"
                  className="text-gray-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition ease-in-out duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/record"
                  className="text-gray-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition ease-in-out duration-200"
                >
                  Record
                </Link>
                <Link
                  to="/song"
                  className="text-gray-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition ease-in-out duration-200"
                >
                  Song
                </Link>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition ease-in-out duration-200"
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {/* Avatar placeholder */}
            <div className="hidden sm:block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600 mr-4">
              <img
                src={userData.avatarUrl}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Logout button */}
            <Link
              to="/login"
              onClick={handleLogout}
              className="text-gray-300 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition ease-in-out duration-200"
            >
              Logout
            </Link>
            {/* For smaller screens, display a hamburger menu icon */}
            <button className="sm:hidden">
              <svg
                className="h-6 w-6 text-gray-300 hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
