// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAuGRdUOgdKlVoIUh6l8IMRhyZyCgmtU2c",
  authDomain: "chordify-6167a.firebaseapp.com",
  projectId: "chordify-6167a",
  storageBucket: "chordify-6167a.appspot.com",
  messagingSenderId: "633782387212",
  appId: "1:633782387212:web:81ce1d5e320006f7a2a429",
  measurementId: "G-P5KXG6362Y",
};

// Initialize Firebase
const Aapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(Aapp);
const auth = getAuth(Aapp);
const provider = new GoogleAuthProvider();
export { auth, provider };
