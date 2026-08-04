import React from "react";
import "./GenreForm.css";
const GenreForm = ({ mode, submitFunction, form, setForm }) => {
  function handleChange(e) {
    setForm({
      name: e.target.value,
    });
  }

  return (
    <div className="genre-create-container">
      <form className="genre-create-card" onSubmit={submitFunction}>
        <h1>{mode} Genre</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Genre Name"
          value={form.name}
          onChange={handleChange}
        />

        <div className="genre-create-button">
          <button type="submit">{mode} Genre</button>
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
