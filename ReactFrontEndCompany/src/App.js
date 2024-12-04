import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import faceshot from './images/faceshot.jpg'; // Import the image
import githubLogo from './images/github.png';
import linkedInLogo from './images/linkedIn.png';
import siteSafeLogo from './images/SiteSafeLogo.png';
import NoHelmet from './images/1NoHelmet.jpg';
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import AddUser from "./AddUser";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="main" element={<Main />} />
				<Route path="register" element={<Register />} />
				<Route path="addUser" element={<AddUser />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;