import React from "react";
import { getLyrics } from "lyrics-dumper";

const ChordDisplay = ({ chordsData }) => {
  // Check if chordsData is undefined or null
  if (!chordsData) {
    return <div></div>; // Or any other appropriate loading indicator
  }
  function CircularArray(arr) {
    this.array = arr;

    // Get the musical note at a specific index
    this.getNote = function (index) {
      if (index < 0) {
        // Handle negative indices
        index = this.array.length + (index % this.array.length);
      }
      return this.array[index % this.array.length];
    };

    // Get the index of a musical note
    this.getNoteIndex = function (note) {
      return this.array.indexOf(note);
    };

    // Get the musical note after applying a shift to the current note
    this.shiftNote = function (note, shiftAmount) {
      const currentIndex = this.getNoteIndex(note);
      if (currentIndex !== -1) {
        const newIndex = (currentIndex + shiftAmount) % this.array.length;
        return this.getNote(newIndex);
      }
      return null; // Note not found in the array
    };
  }
  const userKey = JSON.parse(localStorage.getItem("userKey"));
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
  ];
  let i = 0;
  const circularNotes = new CircularArray(notes);
  const orig = notes.indexOf(chordsData.key);
  const userOrig = notes.indexOf(userKey.key);
  let diff = orig - userOrig > 0 ? orig - userOrig : userOrig - orig;
  diff += 1;
  console.log(orig - userOrig);
  console.log(chordsData.chords.verse);
  function verseTranspose() {
    chordsData.chords.verse.forEach((element) => {
      chordsData.chords.verse[i] =
        circularNotes.shiftNote(
          element[1] === "#" ? element[0] : element.slice(0, 1),
          diff
        ) + element.slice(2);
      i++;
    });
  }
  verseTranspose();

  // const main = async () => {
  //   const result = await getLyrics("Lil Nas X, Jack Harlow - INDUSTRY BABY");

  //   console.log(result); // -> { result object }
  // };
  // main();

  console.log(chordsData.chords.verse);
  i = 0;
  console.log(chordsData.chords.chorus);
  function chorusTranspose() {
    chordsData.chords.chorus.forEach((element) => {
      chordsData.chords.chorus[i] =
        circularNotes.shiftNote(
          element[1] === "#" ? element[0] : element.slice(0, 1),
          diff
        ) + element.slice(2);
      i++;
    });
  }
  chorusTranspose();
  console.log(chordsData.chords.chorus);

  console.log(userKey.key);

  const handleIncrement = () => {
    diff += 1;
  };

  const handleDecrement = () => {
    diff -= 1;
  };

  return (
    <div className="flex">
      {/* Left Half: Chords */}
      <div className="w-1/2 bg-blue-900 text-white p-8 rounded-lg min-w-80">
        <h2 className="text-2xl mb-4">Chords</h2>
        <div className="mb-4">
          <h3 className="text-lg mb-2">Verse</h3>
          <div className="flex flex-wrap">
            {Object.values(chordsData.chords.verse).map((chordName) => (
              <div key={chordName} className="mr-4 mb-2">
                <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md cursor-pointer">
                  {chordName}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg mb-2">Chorus</h3>
          <div className="flex flex-wrap">
            {Object.values(chordsData.chords.chorus).map((chordName) => (
              <div key={chordName} className="mr-4 mb-2">
                <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md cursor-pointer">
                  {chordName}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg mb-2">Capo Position</h3>
          <p>{chordsData.capo}</p>
        </div>
      </div>

      {/* Right Half: Capo */}
      <div className="w-1/2 bg-gray-900 text-white p-8 rounded-lg min-w-80">
        <h2 className="text-2xl mb-4">Lyrics</h2>
        <p>{chordsData.lyrics}</p>
      </div>
    </div>
  );
};

export default ChordDisplay;
