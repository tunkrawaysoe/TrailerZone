import React from "react";

const TrailerSection = ({ trailers }) => {
  return (
    <section className="trailer-section" id="trailers">
      <div className="header">
        <h3 className="title">Trailers</h3>
      </div>

      <div className="trailer-container">
        {trailers.map((trailer) => (
          <div className="trailer-card" key={trailer.id}>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.youtubeKey}`}
              title={trailer.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <p>{trailer.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrailerSection;
