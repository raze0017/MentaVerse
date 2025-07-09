import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    const token = data.token;
    if (response.ok) {
      console.log("token,", token);
      localStorage.setItem("token", token);
      localStorage.setItem("loggedIn", "1");
      setLoggedIn(1);
      navigate("/home");
    } else {
      alert("Incorrect credentials");
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      Login to Mental- Verse
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <input
          id="username"
          className="input"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          className="input"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input className="btn btn-primary" type="submit" />
      </form>
    </div>
  );
}

export default Login;
