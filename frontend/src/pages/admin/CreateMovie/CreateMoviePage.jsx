import React, { useEffect, useState } from "react";
import "./CreateMoviePage.css";
const CreateMoviePage = () => {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseDate: "",
    duration: "",
    posterUrl: "",
    backdropUrl: "",
    language: "",
    genreIds: [],
  });

  function handleSubmit() {}

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleGenreChange(genreId) {
    setForm({
      ...form,
      genreIds: form.genreIds.includes(genreId)
        ? form.genreIds.map((id) => id !== genreId)
        : [...form.genreIds, genreId],
    });
  }
  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch("http://localhost:3000/genres");
      if (!response.ok) return;
      setGenres(await response.json());
    }
    fetchGenres();
  }, []);

  return (
    <div className="create-movie-container">
      <form className="create-movie-card" onSubmit={handleSubmit}>
        <h1>Create Movie</h1>
        <input
          type="text"
          name="title"
          placeholder="Movie title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={form.posterUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          name="backdropUrl"
          placeholder="Backdrop URL"
          value={form.backdropUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
        />
        <div className="genres-container">
          <h3>Genres</h3>
          <div className="genre-list">
            {genres.map((genre) => (
              <label key={genre.id}>
                <input
                  type="checkbox"
                  checked={form.genreIds.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                />
                {genre.name}
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Create Movie</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/movies")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMoviePage;
