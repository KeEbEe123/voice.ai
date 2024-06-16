import React from "react";
import { useState, useEffect } from "react";
import ChordDisplay from "./ChordDisplay";

function AudioRecorder() {
  let userKey;
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [data, setData] = useState([{}]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        setAudioChunks((chunks) => [...chunks, e.data]);
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleSave = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");
    console.log(formData);

    const response = await fetch("/members", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setData(data);
    localStorage.setItem("userKey", JSON.stringify(data));
  };
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Record</h1>
      <div className="flex flex-col items-center">
        <button
          onClick={startRecording}
          disabled={recording}
          className="w-full max-w-md bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className="w-full max-w-md bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
        >
          Stop Recording
        </button>
        <button
          onClick={handleSave}
          disabled={audioChunks.length === 0}
          className="w-full max-w-md bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg"
        >
          Save Recording
        </button>

        <p className="text-4xl font-bold mb-8 mt-9">{`Your key is ${data.key}`}</p>
      </div>
      {data && <ChordDisplay userKey={data} />}
    </div>
  );
}

export default AudioRecorder;
