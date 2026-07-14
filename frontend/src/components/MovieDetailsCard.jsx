import React, { useEffect, useState } from "react";
import ActorCard from "./ActorCard";

const MovieDetailsCard = ({ movieDetails, watchlisted, getWatchList }) => {
  const casts = movieDetails.actors || [];

  async function handleWatchList() {
    if (!watchlisted) {
      const response = await fetch(
        `http://localhost:3000/watchlist/${movieDetails.id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: 2,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        getWatchList();
      } else {
        console.log(data.message);
      }

      return;
    }

    const response = await fetch(
      `http://localhost:3000/watchlist/${movieDetails.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: 2,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      getWatchList();
    } else {
      console.log(data.message);
    }
  }
  return (
    <>
      <section className="movie-details-container">
        <div className="details-image-card">
          <img src={movieDetails.posterUrl} />
        </div>
        <div className="movie-details">
          <h1>{movieDetails.title}</h1>
          <div className="movie-meta">
            <span>{movieDetails.title}</span>
            {movieDetails.genres?.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
          <p className="overview">{movieDetails.description}</p>

          <div className="buttons">
            <button>▶ Watch Trailer</button>
            <button className="watchlist" onClick={handleWatchList}>
              {watchlisted ? "✓ Added" : "+ Add Watchlist"}
            </button>
          </div>
        </div>
      </section>
      <ActorCard casts={casts} />
    </>
  );
};

export default MovieDetailsCard;
