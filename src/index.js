import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBvaVmCk31IcRiUHwTH5dE-RN0zdOol18I",
  authDomain: "fir-dev-bae24.firebaseapp.com",
  projectId: "fir-dev-bae24",
  storageBucket: "fir-dev-bae24.appspot.com",
  messagingSenderId: "415811267911",
  appId: "1:415811267911:web:a326f47ffb29f70d143062",
  measurementId: "G-4G6368RKNB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
