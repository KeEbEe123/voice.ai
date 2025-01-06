import React, { useState } from "react";

const ChordSelector = ({ onSaveChords }) => {
  const [selectedChords, setSelectedChords] = useState([]);
  const [currentChord, setCurrentChord] = useState("");
  const [originalKey, setOriginalKey] = useState("");
  const [userKey, setUserKey] = useState("");

  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "Am",
    "A#m",
    "Bm",
    "Cm",
    "C#m",
    "Dm",
    "D#m",
    "Em",
    "Fm",
    "F#m",
    "Gm",
    "G#m",
  ];

  const handleAddChord = () => {
    if (currentChord && !selectedChords.includes(currentChord)) {
      setSelectedChords([...selectedChords, currentChord]);
      setCurrentChord("");
    }
  };

  const handleRemoveChord = (chord) => {
    setSelectedChords(selectedChords.filter((c) => c !== chord));
  };

  const handleSave = () => {
    onSaveChords(selectedChords, { originalKey, userKey });
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg min-w-80 max-w-3xl mx-auto my-8">
      <h2 className="text-2xl mb-4">Select Your Chords</h2>
      <div className="flex items-center mb-4">
        <select
          value={currentChord}
          onChange={(e) => setCurrentChord(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md mr-4"
        >
          <option value="" disabled>
            Select a chord
          </option>
          {notes.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddChord}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add Chord
        </button>
      </div>
      <div className="flex flex-wrap mb-4">
        {selectedChords.map((chord) => (
          <div key={chord} className="flex items-center mr-4 mb-2">
            <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md cursor-pointer">
              {chord}
            </span>
            <button
              onClick={() => handleRemoveChord(chord)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor="originalKey" className="block mb-2">
          Original Key
        </label>
        <input
          type="text"
          id="originalKey"
          value={originalKey}
          onChange={(e) => setOriginalKey(e.target.value)}
          className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg"
          placeholder="Enter the original key of the song"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="userKey" className="block mb-2">
          Your Vocal Key
        </label>
        <input
          type="text"
          id="userKey"
          value={userKey}
          onChange={(e) => setUserKey(e.target.value)}
          className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg"
          placeholder="Enter your vocal key"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      >
        Save Chords
      </button>
    </div>
  );
};

export default ChordSelector;
