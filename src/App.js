import logo from "./logo.svg";
import "./App.css";
import Navbar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./Pages/Feed";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/feed" exact element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
