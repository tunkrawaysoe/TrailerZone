import React from "react";
import { Link } from "react-router-dom";

export const MainCard = () => {
  const movies = [
    {
      id: 1,
      title: "Deadpool & Wolverine",
      year: 2024,
      poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    },
    {
      id: 3,
      title: "Interstellar",
      year: 2014,
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: 4,
      title: "The Dark Knight",
      year: 2008,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 5,
      title: "Avengers: Endgame",
      year: 2019,
      poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    },
    {
      id: 6,
      title: "The Batman",
      year: 2022,
      poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 7,
      title: "John Wick: Chapter 4",
      year: 2023,
      poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    },
    {
      id: 8,
      title: "Spider-Man: No Way Home",
      year: 2021,
      poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    },
  ];
  return (
    <div className="movie-main-section">
      <div className="header">
        <h3 className="title">Movies</h3>
        <a href="#">Browse All</a>
      </div>

      <div className="movie-main-container">
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} className="movie-link">
            <div className="movie-main-card" key={movie.id}>
              <div className="image-container">
                <img src={movie.poster} />
              </div>
              <p className="movie-main-card-title">{movie.title}</p>
              <p className="movie-main-card-date">{movie.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
