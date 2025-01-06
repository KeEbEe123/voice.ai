import React, { useState } from "react";
import ChordDisplay from "./ChordDisplay";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0wCYD-Lo-LOVhz5U9t4kRP71FsZaopi0",
  authDomain: "voice-66400.firebaseapp.com",
  projectId: "voice-66400",
  storageBucket: "voice-66400.appspot.com",
  messagingSenderId: "98043177324",
  appId: "1:98043177324:web:a7fa4493439ce711592b49",
  measurementId: "G-NLFKCXWQX2",
};

// Initialize Firebase
const Dapp = initializeApp(firebaseConfig, "voice.ai");
const db = getFirestore(Dapp);

function Search() {
  const [inputText, setInputText] = useState("");
  const [chordsData, setChordsData] = useState(null);
  const [choice, setChoice] = useState(null);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const q = query(collection(db, "songs"), where("title", "==", inputText));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const songData = querySnapshot.docs[0].data();
        // Pass the verse and chorus chords separately
        const responseData = {
          chords: {
            verse: songData.chords.verse || [], // Ensure it's an array
            chorus: songData.chords.chorus || [], // Ensure it's an array
          },
          key: songData.key,
          artist: songData.artist,
          lyrics: songData.lyrics,
          capo: songData.capo,
        };
        setChordsData(responseData);
        handleSaveChords(responseData.chords, songData.key, responseData);
      } else {
        console.error("No song found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const transposeChord = (chord, diff) => {
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

    const rootNote = chord.match(/[A-G]#?/)[0];
    const chordSuffix = chord.slice(rootNote.length);
    const noteIndex =
      notes.indexOf(rootNote + chordSuffix) === -1
        ? notes.indexOf(rootNote)
        : notes.indexOf(rootNote + chordSuffix);
    const transposedIndex = (noteIndex + diff + 12) % 12;
    const transposedRootNote = notes[transposedIndex];
    const transposedChord = transposedRootNote + chordSuffix;

    return transposedChord;
  };

  const handleSaveChords = (chords, originalKey, songData) => {
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

    let userArray = localStorage.getItem("userKey");
    userArray = JSON.parse(userArray);
    const userKey = userArray.key;
    const origIndex = notes.indexOf(originalKey);
    const userIndex = notes.indexOf(userKey);
    const diff = userIndex - origIndex;

    const transposedVerseChords = chords.verse.map((chord) =>
      transposeChord(chord, diff)
    );
    const transposedChorusChords = chords.chorus.map((chord) =>
      transposeChord(chord, diff)
    );

    const newChordsData = {
      chords: {
        verse: transposedVerseChords,
        chorus: transposedChorusChords,
      },
      key: userKey,
      capo: songData.capo,
      lyrics: songData.lyrics,
    };

    setChordsData(newChordsData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {!choice && (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setChoice("search")}
            className="w-40 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          >
            Search for a Song
          </button>
          <button
            onClick={() => setChoice("input")}
            className="w-40 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Input Chords
          </button>
        </div>
      )}
      {choice === "search" && (
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
      )}
      {choice === "input" && <ChordSelector onSaveChords={handleSaveChords} />}
      {chordsData && <ChordDisplay chordsData={chordsData} />}
    </div>
  );
}

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
    const chords = {
      verse: selectedChords,
      chorus: [], // You can add a separate input for chorus if needed
    };
    const songData = {
      originalKey,
      userKey,
    };
    onSaveChords(chords, originalKey, songData);
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

export default Search;
