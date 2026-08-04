import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreForm from "../../../components/admin/GenreForm";

const GrenreCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const navigate = useNavigate();

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

  return <GenreForm mode={"Create"} submitFunction={createGenre} form={form}setForm={setForm} />;
};

export default GrenreCreatePage;
