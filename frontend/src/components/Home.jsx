import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("loggedIn", 0);

    navigate("/login");
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      HEllow world
      <div className="btn" onClick={logOut}>
        Logout
      </div>
    </div>
  );
}

export default Home;
