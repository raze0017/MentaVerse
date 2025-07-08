import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const log = localStorage.getItem("loggedIn");
    if (log) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </>
  );
}
function App() {
  return (
    <Router>
      <AppContent />{" "}
    </Router>
  );
}

export default App;
