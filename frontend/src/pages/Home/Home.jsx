import { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { MainCard } from "../../components/MainCard";
import MovieSection from "../../components/MovieCardSection";
import Navbar from "../../components/Navbar";
import "./Home.css";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  
  async function fetchMovies() {
    const [popularResponse, topRatedResponse, allMoviesResponse] =
      await Promise.all([
        fetch("http://localhost:3000/movies/popular"),
        fetch("http://localhost:3000/movies/top-rated"),
        fetch("http://localhost:3000/movies"),
      ]);
    const popularMovies = await popularResponse.json();
    const topMovies = await topRatedResponse.json();
    const allMovies = await allMoviesResponse.json();

    setPopularMovies(popularMovies);
    setTopRatedMovies(topMovies);
    setAllMovies(allMovies.movies);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <MovieSection movies={popularMovies} title="Popular Movies" />
      <MovieSection movies={topRatedMovies} title="Top Rated Movies" />
      <MainCard movies={allMovies} />
    </>
  );
}
