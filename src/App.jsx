// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <Router>
      <nav
        style={{
          padding: 16,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img src="/logo.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
        <Link to="/signin" style={{ marginRight: 16, textDecoration: "none", color: "#1976d2" }}>
          Sign In
        </Link>
        <Link to="/signup" style={{ marginRight: 16, textDecoration: "none", color: "#1976d2" }}>
          Sign Up
        </Link>
        <Link to="/profile" style={{ textDecoration: "none", color: "#1976d2" }}>
          Profile
        </Link>
      </nav>

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
