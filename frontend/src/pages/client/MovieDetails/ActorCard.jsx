import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ActorCard = () => {
  const movieDetails = useSelector((state) => state.movie.item);
  const casts = movieDetails.actors || [];
  return (
    <>
      <div className="header">
        <h3 className="title">Cast</h3>
      </div>
      <div className="movie-cast-container">
        {casts.map((cast) => (
          <Link to={`/actors/${cast.id}`} key={cast.id} className="link">
            <div className="actor-card">
              <img src={cast.profileImage} />
              <p className="name">{cast.name}</p>
              <p className="character">{cast.characterName}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ActorCard;
