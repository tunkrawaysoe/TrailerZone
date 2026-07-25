import React, { useEffect, useState } from "react";
import "./CreateMoviePage.css";
import { useNavigate } from "react-router-dom";
const CreateMoviePage = () => {
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseDate: "",
    duration: "",
    posterUrl: "",
    backdropUrl: "",
    language: "",
    genreIds: [],
    actors: [],
    directorIds: [],
  });

  async function createMovie(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/admin/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) return;
    navigate("/admin/movies");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "duration" ? Number(value) : value,
    });
  }

  function handleGenreChange(genreId) {
    setForm({
      ...form,
      genreIds: form.genreIds.includes(genreId)
        ? form.genreIds.filter((id) => id !== genreId)
        : [...form.genreIds, genreId],
    });
  }

  function addActor(actorId) {
    if (!actorId) return;
    const alreadyExist = form.actors.some((actor) => actor.actorId === actorId);

    if (alreadyExist) return;

    setForm({
      ...form,
      actors: [
        ...form.actors,
        {
          actorId,
          characterName: "",
        },
      ],
    });
  }

  function updateCharacter(index, value) {
    const updatedActors = [...form.actors];
    updatedActors[index].characterName = value;
    setForm({
      ...form,
      actors: updatedActors,
    });
  }

  function removeActor(index) {
    setForm({
      ...form,
      actors: form.actors.filter((_, i) => i !== index),
    });
  }

  function addDirector(directorId) {
    if (!directorId) return;
    const existingDirectorId = [...form.directorIds].some(
      (id) => id === directorId,
    );
    if (existingDirectorId) return;
    setForm({
      ...form,
      directorIds: [...form.directorIds, directorId],
    });
  }

  function removeDirector(directorId) {
    if (!directorId) return;
    setForm({
      ...form,
      directorIds: form.directorIds.filter((id) => id !== directorId),
    });
  }

  useEffect(() => {
    async function fetchData() {
      const [genreRes, actorRes, directorRes] = await Promise.all([
        fetch("http://localhost:3000/genres"),
        fetch("http://localhost:3000/actors"),
        fetch("http://localhost:3000/directors"),
      ]);

      setGenres(await genreRes.json());
      setActors(await actorRes.json());
      setDirectors(await directorRes.json());
    }

    fetchData();
  }, []);

  return (
    <div className="create-movie-container">
      <form className="create-movie-card" onSubmit={createMovie}>
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

        <div className="actors-container">
          <h3>Actors</h3>

          <select
            defaultValue=""
            onChange={(e) => {
              addActor(Number(e.target.value));
              e.target.value = "";
            }}
          >
            <option value="">Select Actor</option>

            {actors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name}
              </option>
            ))}
          </select>

          {form.actors.map((actor, index) => (
            <div key={actor.actorId} className="actor-item">
              <span>{actors.find((a) => a.id === actor.actorId)?.name}</span>

              <input
                type="text"
                placeholder="Character Name"
                value={actor.characterName}
                onChange={(e) => updateCharacter(index, e.target.value)}
              />

              <button type="button" onClick={() => removeActor(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="director-container">
          <h3>Directors</h3>

          <select
            defaultValue=""
            onChange={(e) => {
              addDirector(Number(e.target.value));
              e.target.value = "";
            }}
          >
            <option value="">Select Director</option>

            {directors.map((director) => (
              <option key={director.id} value={director.id}>
                {director.name}
              </option>
            ))}
          </select>

          {form.directorIds.map((directorId) => (
            <div key={directorId} className="director-item">
              <span>
                {directors.find((director) => director.id === directorId)?.name}
              </span>

              <button type="button" onClick={() => removeDirector(directorId)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit">Create Movie</button>

          <button
            type="button"
            className="cancel-btn"
            onClick={()=>navigate("/admin/movies")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMoviePage;
