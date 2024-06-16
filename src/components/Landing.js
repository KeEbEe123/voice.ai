import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-gray-800 text-white max-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-800 pt-20 pb-24 max-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-montserrat">
              Chordify<span className="text-red-400">.ai</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 font-montserrat">
              Sing it <span className="text-red-400">your</span> way.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-red-400 transition-colors text-white px-6 py-3 rounded-full font-semibold">
                  Sign In
                </button>
              </Link>
              <button className="bg-blue-600 hover:bg-red-400 transition-colors text-white px-6 py-3 rounded-full font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
