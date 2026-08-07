import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Hero() {
  const movies = useSelector((state) => state.movie.items);
  const [index, setIndex] = useState(0);
  const heroMovies = movies.slice(0, 5);
  const movie = heroMovies[index];

  useEffect(() => {
    if (!heroMovies.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === heroMovies.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [heroMovies]);

  if (!movie) return null;

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0,0,0,0.95),
            rgba(0,0,0,0.3)
          ),
          url(${movie.backdropUrl})
        `,
      }}
    >
      <div className="hero-content">
        <h3>{movie.title}</h3>

        <p>
          {movie.description ||
            "Discover popular movies, watch trailers and save your favorites."}
        </p>

        <button>Watch Trailer</button>
      </div>

      <div className="hero-dots">
        {heroMovies.map((_, i) => (
          <span
            key={i}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
