// By: Tomas Smitas
// Date: 2024
// Development: Assisted by chatGPT

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import githubLogo from './images/github.png';
import linkedInLogo from './images/linkedIn.png';
import siteSafeLogo from './images/SiteSafeLogo.png';
import NoHelmet from './images/1NoHelmet.jpg';
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import AddUser from "./AddUser";
import ManageUsers from "./ManageUsers.js";
import PrivateRoute from "./PrivateRoute";

function App() {

  return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<Login />} />
				<Route path="register" element={<Register />} />

				{/* Protected Routes */}
				<Route
					path="main"
					element={
						<PrivateRoute>
							<Main />
						</PrivateRoute>
					}
				/>
				<Route
					path="addUser"
					element={
						<PrivateRoute>
							<AddUser />
						</PrivateRoute>
					}
				/>
				<Route
					path="manageUsers"
					element={
						<PrivateRoute>
							<ManageUsers />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
  );
}

export default App;