import React, { useState } from "react";

const Transpose = () => {
  const [transposeValue, setTransposeValue] = useState(0);

  const handleIncrement = () => {
    setTransposeValue(transposeValue + 1);
  };

  const handleDecrement = () => {
    setTransposeValue(transposeValue - 1);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <button
        onClick={handleDecrement}
        className="text-2xl px-3 py-1 mr-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
      >
        -
      </button>
      <span className="text-xl mr-2">TRANSPOSE</span>
      <button
        onClick={handleIncrement}
        className="text-2xl px-3 py-1 ml-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
      >
        +
      </button>
    </div>
  );
};

export default Transpose;
