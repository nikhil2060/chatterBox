import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetAvatar from "./comp/SetAvatar";
import PhotoPicker from "./pages/PhotoPicker";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path="signup" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="setavatar" element={<SetAvatar />}></Route>
        <Route path="photopicker" element={<PhotoPicker />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
