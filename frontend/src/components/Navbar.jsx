import React from "react";

function Navbar() {
  return (
    <nav className="flex flex-row justify-around">
      <ul>
        <li>
          {" "}
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
