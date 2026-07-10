import Hero from "../../components/Hero";
import { MainCard } from "../../components/MainCard";
import MovieSection from "../../components/MovieSection";
import { Navbar } from "../../components/Navbar";
import "./Home.css";
export default function Home() {
  const popularMovies = [
     {
      id: 20,
      title: "Schindler's List",
      year: 1993,
      poster: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    },
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 2,
      title: "Interstellar",
      year: 2014,
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: 3,
      title: "Inception",
      year: 2010,
      poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    },
    {
      id: 4,
      title: "Wonder Woman",
      year: 2017,
      poster: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    },
    {
      id: 5,
      title: "The Dark Knight",
      year: 2008,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 6,
      title: "Interstellar",
      year: 2014,
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: 7,
      title: "Inception",
      year: 2010,
      poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    },
    {
      id: 8,
      title: "Wonder Woman",
      year: 2017,
      poster: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    },
  ];

  const topRatedMovies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      poster: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 4,
      title: "Schindler's List",
      year: 1993,
      poster: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    },
    {
      id: 48,
      title: "Schindler's List",
      year: 1993,
      poster: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    },
    {
      id: 5,
      title: "12 Angry Men",
      year: 1957,
      poster: "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
    },
    {
      id: 6,
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
      poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    },
    {
      id: 7,
      title: "Pulp Fiction",
      year: 1994,
      poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    },
    {
      id: 8,
      title: "Fight Club",
      year: 1999,
      poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    },
  ];
  return (
    <>
      <Navbar />
      <Hero />
      <MovieSection movies={popularMovies} title="Popular Movies" />
      <MovieSection movies={topRatedMovies} title="Top Rated Movies" />
      <MainCard />
    </>
  );
}
