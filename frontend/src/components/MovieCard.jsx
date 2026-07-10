import React from "react";

export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card" key={movie.id}>
      <img src={movie.poster} />
      <p className="movie-title">{movie.title}</p>
      <p className="movie-date">{movie.year}</p>
    </div>
  );
};
