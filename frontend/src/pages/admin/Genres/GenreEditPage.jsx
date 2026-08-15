import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GenreForm from "../../../components/admin/GenreForm";

const GenreEditPage = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genre.items);
  const genreToEdit = genres.find((genre) => genre.id === Number(id));

  async function editGenre(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/genres/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) return;
    navigate("/admin/genres");
  }

  useEffect(() => {
    if (!genreToEdit) return;
    setForm({
      name: genreToEdit.name,
    });
  }, [genreToEdit]);

  return (
    <GenreForm
      form={form}
      setForm={setForm}
      submitFunction={editGenre}
      mode="Edit"
    />
  );
};

export default GenreEditPage;
