import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Actor.css";
import { MainCard } from "../../components/MainCard";
const Actor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState({});
  useEffect(() => {
    async function fetchActor() {
      const actorResponse = await fetch(`http://localhost:3000/actors/${id}`);
      const actorDetails = await actorResponse.json();
      setActor(actorDetails);
    }
    fetchActor();
  }, []);
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
