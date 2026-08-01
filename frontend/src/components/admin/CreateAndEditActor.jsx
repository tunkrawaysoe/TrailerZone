import React from "react";
import { useNavigate } from "react-router-dom";

const CreateAndEditActor = ({ form, setForm, submitFunction, mode }) => {
  const navigate = useNavigate();
  
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="create-movie-container">
      <form className="create-movie-card" onSubmit={submitFunction}>
        <h1>{mode} Actor</h1>

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
          <button type="submit">{mode} Actor</button>

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

export default CreateAndEditActor;
