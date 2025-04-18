// src/App.jsx
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { supabase } from "../SupabaseClient";
import { saveAuth, saveEmail } from "./slices/userInfoSlice";

const App = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    const checkSession = async()=>{
      const {data: {session}} = await supabase.auth.getSession();
      dispatch(saveAuth({
        isAuthenticated: !!session,
        isSessionChecked: true,
        user_id: session.user.id,
      }))
      dispatch(saveEmail(session.user.email));
    }

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(saveAuth({
        isAuthenticated: !!session,
        isSessionChecked: true,
        user_id:session.user.id,
      }));
      dispatch(saveEmail(session.user.email));
    });

    return () => subscription.unsubscribe();
  },[dispatch])

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
        <Link to="/dashboard" style={{ textDecoration: "none", color: "#1976d2" }}>
          Dashboard
        </Link>
      </nav>

      <Routes>
        <Route path="/" element= {<Navigate to={"/dashboard"}/>}/> 
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProtectedRoute element={UserProfile}/>} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard}/>} />
      </Routes>
    </Router>
  );
};

export default App;
