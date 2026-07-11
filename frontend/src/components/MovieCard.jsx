import React from "react";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-link">
      <div className="movie-card" key={movie.id}>
        <img src={movie.poster} />
        <p className="movie-title">{movie.title}</p>
        <p className="movie-date">{movie.year}</p>
      </div>
    </Link>
  );
};
