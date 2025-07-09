import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  const logOut = () => {
    localStorage.setItem("loggedIn", "0");
    setLoggedIn(0);
    navigate("/login");
  };
  return (
    <nav className="">
      <ul className="flex flex-row justify-between">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <div className="btn" onClick={logOut}>
            Logout
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
