import React from "react";
import "./DirectorForm.css";

const DirectorForm = ({ mode, submitFunction, form, setForm }) => {
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="create-director-container">
      <form onSubmit={submitFunction} className="create-director-card">
        <h1>{mode} Director</h1>

        <input
          type="text"
          name="name"
          placeholder="Director Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="biography"
          placeholder="Biography"
          value={form.biography}
          onChange={handleChange}
        />

        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />

        <div className="create-button">
          <button type="submit">{mode} Director</button>
        </div>
      </form>
    </div>
  );
};

export default DirectorForm;
