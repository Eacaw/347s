import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/NavBar";
import { Feed, Login, Profile, RecipeForm } from "./Pages/Pages";

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

function App() {
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
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/feed" exact element={<Feed />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/recipe" exact element={<RecipeForm />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
