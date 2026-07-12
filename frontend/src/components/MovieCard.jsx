import React from "react";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-link">
      <div className="movie-card">
        <img src={movie.posterUrl} />
        <p className="movie-title">{movie.title}</p>
        <p className="movie-date">
          {new Date(movie.releaseDate).getFullYear()}
        </p>
      </div>
    </Link>
  );
};
