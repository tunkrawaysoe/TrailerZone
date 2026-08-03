import React, { useState } from "react";
import "./GenreCreatePage.css";
import { useNavigate } from "react-router-dom";
const GrenreCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      name: e.target.value,
    });
  }

  async function createGenre(e) {
    e.preventDefault();
    const response = fetch(" http://localhost:3000/genres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    navigate("/admin/genres");
  }

  return (
    <div className="genre-create-container">
      <form className="genre-create-card" onSubmit={createGenre}>
        <h1>Create Genre</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Genre Name"
          value={form.name}
          onChange={handleChange}
        />

        <div className="genre-create-button">
          <button type="submit">Create Genre</button>
        </div>
      </form>
    </div>
  );
};

export default GrenreCreatePage;
