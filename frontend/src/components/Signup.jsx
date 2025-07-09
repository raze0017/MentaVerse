import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ loggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn == 0) {
      navigate("/home");
    }
  }, [navigate, loggedIn]);
  const url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      localStorage.setItem("loggedIn", 1);
      console.log("user signed up successfully");
    } else {
      alert("user already exist");
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      Signup to Mental- Verse
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="label">Username</label>
        <input
          className="input"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <label>Password</label>
        <input
          className="input"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input className="btn btn-primary" type="submit" />
      </form>
      <div onClick={() => navigate("/login")} className="btn btn-accent">
        Already have an account?
      </div>
    </div>
  );
}

export default Signup;
