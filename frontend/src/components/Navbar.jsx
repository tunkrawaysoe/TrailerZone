import React from "react";

export const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <h1 className="logo">MovieHub</h1>
        <ul className="nav-links">
          <li>
            <a href="http://127.0.0.1:5500/sample%20html/index.html">Home</a>
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
};
