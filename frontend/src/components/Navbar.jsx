import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          <h1>MovieHub</h1>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {accessToken && (
            <li>
              <Link to="/watchLists">Watchlist</Link>
            </li>
          )}

          <li>
            {accessToken ? (
              <Link to="/profile" className="profile-link">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="navbar-avatar"
                  />
                ) : (
                  <div className="navbar-avatar">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            ) : (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
