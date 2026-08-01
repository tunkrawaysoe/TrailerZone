import React, { act, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainCard } from "../../../components/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchActor } from "../../../redux/actorSlice";
import "./Actor.css";

const Actor = () => {
  const actor = useSelector((state) => state.actor.item);
  const loading = useSelector((state) => state.actor.loading);
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(fetchActor(id));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
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
      <div className="section">
        <MainCard movies={actor.movies} showBrowse={false} title={"Movies"} />
      </div>
    </>
  );
};

export default Actor;
