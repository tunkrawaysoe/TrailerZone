import { useEffect, useState } from "react";
import { MainCard } from "../../../components/MainCard";
import MovieSection from "../../../components/MovieCardSection";
import MainCardSection from "../../../components/MainCardSection";
import Hero from "./Hero";
import "./Home.css";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  async function fetchMovies() {
    const [popularResponse, topRatedResponse] = await Promise.all([
      fetch("http://localhost:3000/movies/popular"),
      fetch("http://localhost:3000/movies/top-rated"),
    ]);
    const popularMovies = await popularResponse.json();
    const topMovies = await topRatedResponse.json();

    setPopularMovies(popularMovies);
    setTopRatedMovies(topMovies);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Hero />
      <div className="section">
        <MovieSection movies={popularMovies} title="Popular Movies" />
        <MovieSection movies={topRatedMovies} title="Top Rated Movies" />
        <MainCardSection />
      </div>
    </>
  );
}
