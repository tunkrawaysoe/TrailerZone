import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchActor } from "../../../redux/actorSlice";

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

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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
    <div className="create-movie-container">
      <form className="create-movie-card" onSubmit={updateActor}>
        <h1>Edit Actor</h1>

        <input
          type="text"
          name="name"
          placeholder="Actor Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          value={form.profileImage}
          onChange={handleChange}
        />

        <textarea
          name="biography"
          placeholder="Biography"
          value={form.biography}
          onChange={handleChange}
          rows={6}
        />

        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit">Update Actor</button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/actors")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditActorPage;
