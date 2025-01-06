import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import ChordDisplay from "./ChordDisplay";

function AudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [data, setData] = useState([{}]);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const sphereRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); // Change the color code as needed

    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "-1";
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(2, 32, 32); // Reduced initial sphere size
    const material = new THREE.MeshBasicMaterial({
      color: 0xef5350,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    const originalPositions = geometry
      .clone()
      .attributes.position.array.slice();

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.005; // Adjust the rotation speed as necessary

      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        const positions = sphere.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          const index = Math.floor((i / 3) % dataArrayRef.current.length);
          const scale = dataArrayRef.current[index] / 512; // Further reduced scaling factor

          positions[i] = originalPositions[i] * (1 + scale * 2); // Further reduced scaling
          positions[i + 1] = originalPositions[i + 1] * (1 + scale * 2);
          positions[i + 2] = originalPositions[i + 2] * (1 + scale * 2);
        }

        sphere.geometry.attributes.position.needsUpdate = true;
        sphere.geometry.computeVertexNormals();
      } else {
        // Gradually return the sphere to its original shape
        const positions = sphere.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i++) {
          positions[i] += (originalPositions[i] - positions[i]) * 0.1;
        }
        sphere.geometry.attributes.position.needsUpdate = true;
        sphere.geometry.computeVertexNormals();
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      // Set up audio context and analyser
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      // Connect the stream to the audio context and analyser
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

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

    const response = await fetch(
      "https://voice-backend-o7sz.onrender.com//members",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setData(data);
    localStorage.setItem("userKey", JSON.stringify(data));
  };

  return (
    <div className="relative w-full h-full min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-opacity-40 text-white relative z-10">
        <h1 className="text-4xl font-bold mb-8">Record</h1>
        <div className="flex flex-col items-center">
          <button
            onClick={startRecording}
            disabled={recording}
            className="w-full max-w-md bg-gray-800 hover:bg-gray-700 active:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg mb-4"
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
    </div>
  );
}

export default AudioRecorder;
