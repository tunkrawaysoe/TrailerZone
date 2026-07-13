import React from "react";
import { useParams } from "react-router-dom";
import "./Actor.css";
import { MainCard } from "../../components/MainCard";
const Actor = () => {
  const { id } = useParams();
  const actor = {
    id: 3,
    name: "Tom Hardy",
    profileImage: "https://i.pravatar.cc/500?img=12",
    biography:
      "British actor known for Venom, Mad Max: Fury Road, and The Dark Knight Rises",
    birthDate: "1977-09-15",
    movies: [
      {
        id: 27,
        title: "Interstellar",
        releaseDate: "2014-11-07",
        posterUrl:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      },
      {
        id: 28,
        title: "Venom",
        releaseDate: "2018-10-05",
        posterUrl:
          "https://image.tmdb.org/t/p/w500/1M7M0D3q5s8F6p2q6X7qGf9q.jpg",
      },
      {
        id: 29,
        title: "Mad Max: Fury Road",
        releaseDate: "2015-05-15",
        posterUrl:
          "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
      },
      {
        id: 30,
        title: "The Dark Knight Rises",
        releaseDate: "2012-07-20",
        posterUrl:
          "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
      },
    ],
  };
  return (
    <>
      <section className="actor-details-container">
        <div className="image-card">
          <img src={actor.profileImage} alt={actor.name} />
        </div>

        <div className="actor-info">
          <p className="actor-name">{actor.name}</p>
          <p className="actor-dob">
            Born: {new Date(actor.birthDate).toLocaleDateString()}
          </p>
          <p className="actor-biography">{actor.biography}</p>
        </div>
      </section>
      <MainCard movies={actor.movies} showBrowse={false} />
    </>
  );
};

export default Actor;
