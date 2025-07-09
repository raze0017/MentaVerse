import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "1"
  );
  useEffect(() => {
    const log = localStorage.getItem("loggedIn");
    const isLoggedIn = log === "1";
    setLoggedIn(isLoggedIn);
    if (
      (isLoggedIn && location.pathname == "/login") ||
      location.pathname == "/signup"
    ) {
      navigate("/home");
    }
    if (!isLoggedIn && location.pathname == "/home") {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
      <Routes>
        <Route
          path="login"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="signup" element={<Signup loggedIn={loggedIn} />} />
        <Route path="home" element={<Home />} />
        <Route path="/" element={<Home />} />
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
