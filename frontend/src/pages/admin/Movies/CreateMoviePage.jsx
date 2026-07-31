import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAndEditForm from "../../../components/admin/CreateAndEditForm";
const CreateMoviePage = () => {
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

  return (
    <CreateAndEditForm
      submitForm={createMovie}
      form={form}
      setForm={setForm}
      title={"Create Movie"}
    />
  );
};

export default CreateMoviePage;
