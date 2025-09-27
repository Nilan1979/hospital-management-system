import './App.css';
import Navbar from './nursesPages/Navbar';
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';

import Home from "./nursesPages/nurseHome";
import Treatment from "./nursesPages/Treatment";
import AddPatients from "./nursesPages/AddPatients";
import Medications from "./nursesPages/Medications";
import Login from "./nursesPages/Login";

function NursesApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Correct login page check
  const isLoginPage = location.pathname === "/nurses/login";

  // ✅ Private Route wrapper
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="login" />; // relative path
  };

  // ✅ Handle login success
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/nurses"); // redirect to nurse home
  };

  return (
    <div className="App">
      {/* ✅ Show Navbar only if NOT on login page */}
      {!isLoginPage && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <div className="container">
        <Routes>
          {/* Login Page */}
          <Route path="login" element={<Login onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route path="" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="Treatment" element={<PrivateRoute><Treatment /></PrivateRoute>} />
          <Route path="AddPatients" element={<PrivateRoute><AddPatients /></PrivateRoute>} />
          <Route path="Medications" element={<PrivateRoute><Medications /></PrivateRoute>} />

          {/* Catch-all route: redirect unknown paths to login */}
          <Route path="*" element={<Navigate to="login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default NursesApp;
