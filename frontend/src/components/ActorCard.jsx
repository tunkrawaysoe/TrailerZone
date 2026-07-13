import React from "react";

const ActorCard = ({ casts }) => {
  return (
    <section className="section">
      <div className="header">
        <h3 className="title">Cast</h3>
      </div>
      <div className="movie-cast-container">
        {casts.map((cast) => (
          <div className="actor-card" key={cast.id}>
            <img src={cast.profileImage} />
            <p className="actor-name">{cast.name}</p>
            <p className="character">{cast.characterName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActorCard;
