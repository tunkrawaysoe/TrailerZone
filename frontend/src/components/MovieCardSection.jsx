import React from "react";
import { MovieCard } from "./MovieCard";

const MovieSection = ({ movies, title }) => {
  return (
    <section className="section">
      <div className="header">
        <h3 className="title">{title}</h3>
      </div>

      <div className="movie-cast-container">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
