import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  async function handleLogout() {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        credentials: "include",
      });
      dispatch(logOut());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

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
          {accessToken && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
