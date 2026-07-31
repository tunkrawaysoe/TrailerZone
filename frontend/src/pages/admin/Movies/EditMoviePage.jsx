import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../../../redux/movieSlice";
import CreateAndEditForm from "../../../components/admin/CreateAndEditForm";

const EditMoviePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
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

  const updateMovie = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/admin/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) return;
    navigate("/admin/movies");
  };

  return (
    <CreateAndEditForm
      submitForm={updateMovie}
      title={"Edit Movie"}
      form={form}
      setForm={setForm}
    />
  );
};

export default EditMoviePage;
