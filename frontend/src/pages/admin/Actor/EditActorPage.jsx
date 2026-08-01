import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchActor } from "../../../redux/actorSlice";
import CreateAndEditActor from "../../../components/admin/CreateAndEditActor";

const EditActorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actor = useSelector((state) => state.actor.item);
  const loading = useSelector((state) => state.actor.loading);

  const [form, setForm] = useState({
    name: "",
    profileImage: "",
    biography: "",
    birthDate: "",
  });

  useEffect(() => {
    dispatch(fetchActor(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!actor) return;

    setForm({
      name: actor.name || "",
      profileImage: actor.profileImage || "",
      biography: actor.biography || "",
      birthDate: actor.birthDate ? actor.birthDate.slice(0, 10) : "",
    });
  }, [actor]);

  async function updateActor(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/actors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      alert("Failed to update actor.");
      return;
    }

    navigate("/admin/actors");
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!actor) {
    return <h2>Actor not found.</h2>;
  }

  return (
    <CreateAndEditActor
      form={form}
      setForm={setForm}
      submitFunction={updateActor}
      mode={"Edit"}
    />
  );
};

export default EditActorPage;
