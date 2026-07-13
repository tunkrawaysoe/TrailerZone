import React from "react";
import ActorCard from "./ActorCard";

const MovieDetailsCard = ({ details }) => {
  const casts = details.actors || [];
  
  return (
    <>
      <section className="movie-details-container">
        <div className="image-card">
          <img src={details.posterUrl} />
        </div>

        <div className="movie-details">
          <h1>{details.title}</h1>
          <div className="movie-meta">
            <span>{details.title}</span>
            {details.genres?.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
          <p className="overview">{details.description}</p>

          <div className="buttons">
            <button>▶ Watch Trailer</button>
            <button className="watchlist">+ Add Watchlist</button>
          </div>
        </div>
      </section>

      <ActorCard casts={casts} />
    </>
  );
};

export default MovieDetailsCard;
