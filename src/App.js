import "./App.css";
import Navbar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Feed, Profile } from "./Pages/Pages";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/feed" exact element={<Feed />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
