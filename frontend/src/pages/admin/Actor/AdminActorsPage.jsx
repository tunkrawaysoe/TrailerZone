import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActors, removeActor } from "../../../redux/actorSlice";
import { useNavigate } from "react-router-dom";
import PersonTable from "../../../components/admin/PersonTable";

const AdminActorsPage = () => {
  const actors = useSelector((state) => state.actor.items);
  const loading = useSelector((state) => state.actor.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  async function deleteActor(actorId) {
    const response = await fetch(`http://localhost:3000/actors/${actorId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) return;
    dispatch(removeActor(actorId));
  }

  return (
    <PersonTable
      mode={"Actors"}
      loading={loading}
      people={actors}
      onDelete={deleteActor}
    />
  );
};

export default AdminActorsPage;
