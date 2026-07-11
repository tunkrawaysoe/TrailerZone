import React from "react";
import Navbar from "../../components/Navbar";
import MovieSection from "../../components/MovieCardSection";
import MovieDetailsCard from "../../components/MovieDetailsCard";
import "./MovieDetails.css";

const MovieDetails = () => {
  const movieDetail = {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    duration: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    overview:
      "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
  };
  const casts = [
    {
      id: 1,
      name: "Christian Bale",
      character: "Bruce Wayne / Batman",
      image: "https://image.tmdb.org/t/p/w500/85vxYQf4Rj5S4CStKk6tTzyuQ.jpg",
    },
    {
      id: 2,
      name: "Heath Ledger",
      character: "Joker",
      image: "https://image.tmdb.org/t/p/w500/5Y9HnYYa9jF4NunY9lSgJGjv9.jpg",
    },
    {
      id: 3,
      name: "Aaron Eckhart",
      character: "Harvey Dent",
      image: "https://image.tmdb.org/t/p/w500/9SruDggWQj4T5Uu5W0K0wL4F.jpg",
    },
    {
      id: 4,
      name: "Michael Caine",
      character: "Alfred",
      image: "https://image.tmdb.org/t/p/w500/uHn3e3F9b1Q1n9wR5Kk7p.jpg",
    },
    {
      id: 5,
      name: "Gary Oldman",
      character: "James Gordon",
      image: "https://image.tmdb.org/t/p/w500/2v9FVVBUrrkW2m3QOcYkuhq9A6o.jpg",
    },
  ];
  const similarMovies = [
    {
      id: 1,
      title: "Batman Begins",
      year: 2005,
      poster: "https://image.tmdb.org/t/p/w500/8RW2runSEc34IwKN2D1aPcJd2UL.jpg",
    },
    {
      id: 2,
      title: "The Dark Knight Rises",
      year: 2012,
      poster: "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
    },
    {
      id: 3,
      title: "Joker",
      year: 2019,
      poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    },
    {
      id: 4,
      title: "The Batman",
      year: 2022,
      poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 5,
      title: "Watchmen",
      year: 2009,
      poster: "https://image.tmdb.org/t/p/w500/aVUR2Yv0k0oA6M5rM5L7Y2J0.jpg",
    },
  ];
  return (
    <>
      <Navbar />
      <MovieDetailsCard details={movieDetail} casts={casts} />
      <MovieSection movies={similarMovies} title="Similar Movies" />
    </>
  );
};

export default MovieDetails;
