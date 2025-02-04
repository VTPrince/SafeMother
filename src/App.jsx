

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
        <img
          src="/logo.png" // Path to your logo in the public folder
          alt="Logo"
          style={{ height: 100, marginRight: 16 }}
        />
        <Link to="/signin" style={{ marginRight: 16, textDecoration: "none", color: "#1976d2" }}>
          Sign In
        </Link>
        <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
          Sign Up
        </Link>
      </nav>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;










