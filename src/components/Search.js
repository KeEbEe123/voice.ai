import React, { useState } from "react";
import ChordDisplay from "./ChordDisplay";
import { json } from "react-router-dom";

function Search() {
  const [inputText, setInputText] = useState("");
  const [chordsData, setChordsData] = useState(null);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_input", inputText);

    try {
      const response = await fetch("http://127.0.0.1:5001/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      setChordsData(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <label
          htmlFor="textbox"
          className="text-3xl font-bold mb-9 flex flex-row justify-center"
        >
          Search Song
        </label>
        <input
          type="text"
          id="textbox"
          name="user_input"
          value={inputText}
          onChange={handleChange}
          className="w-full py-2 px-4 mb-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 "
          placeholder="Search for a song..."
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-9"
        >
          Search
        </button>
      </form>
      {chordsData && <ChordDisplay chordsData={chordsData} />}
    </div>
  );
}

export default Search;
