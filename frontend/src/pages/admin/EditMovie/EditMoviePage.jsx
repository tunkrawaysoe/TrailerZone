import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovie } from "../../../redux/movieSlice";

const EditMoviePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movieDetails = useSelector((state) => state.movie.item);

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

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!movieDetails) return;

    setForm({
      title: movieDetails.title || "",
      description: movieDetails.description || "",
      releaseDate: movieDetails.releaseDate
        ? movieDetails.releaseDate.slice(0, 10)
        : "",
      duration: movieDetails.duration || "",
      posterUrl: movieDetails.posterUrl || "",
      backdropUrl: movieDetails.backdropUrl || "",
      language: movieDetails.language || "",

      genreIds: movieDetails.genres
        ? movieDetails.genres.map((genre) => genre.id)
        : [],

      actors: movieDetails.actors
        ? movieDetails.actors.map((actor) => ({
            actorId: actor.id,
            characterName: actor.characterName,
          }))
        : [],

      directorIds: movieDetails.directors
        ? movieDetails.directors.map((director) => director.id)
        : [],
    });
  }, [movieDetails]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  }

  console.log(form);

  return (
    <div className="create-movie-container">
      <form className="create-movie-card" >
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
            onClick={() => navigate("/admin/movies")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMoviePage;
