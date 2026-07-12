import React from "react";
import { Link } from "react-router-dom";

export const MainCard = ({ movies }) => {
  return (
    <div className="movie-main-section">
      <div className="header">
        <h3 className="title">Movies</h3>
        <a href="#">Browse All</a>
      </div>

      <div className="movie-main-container">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            className="movie-link"
            key={movie.id}
          >
            <div className="movie-main-card">
              <div className="image-container">
                <img src={movie.posterUrl} />
              </div>
              <p className="movie-main-card-title">{movie.title}</p>
              <p className="movie-main-card-date">
                {new Date(movie.releaseDate).getFullYear()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
