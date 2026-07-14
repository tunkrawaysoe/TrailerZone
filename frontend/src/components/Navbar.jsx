import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <Link to={"/"} className="logo">
          <h1>MovieHub</h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to={"/watchLists"}>WatchList</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
