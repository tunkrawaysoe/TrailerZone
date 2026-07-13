import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <h1 className="logo">MovieHub</h1>
        <ul className="nav-links">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <a href="http://127.0.0.1:5500/sample%20html/movie.html">Movies</a>
          </li>
          <li>
            <a href="#">Popular Movies</a>
          </li>
          <li>
            <a href="#">Top Rated</a>
          </li>
          <li>
            <a href="#">Watchlist</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
