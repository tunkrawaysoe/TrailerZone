import React from "react";
import { Link } from "react-router-dom";

const ActorCard = ({ casts }) => {
  return (
    <section className="section">
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
    </section>
  );
};

export default ActorCard;
