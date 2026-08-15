import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DirectorForm from "../../../components/admin/DirectorForm";
const DirectorCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    biography: "",
    birthDate: "",
  });

  async function createDirector(e) {
    console.log(form);
    e.preventDefault();

    const response = await fetch("http://localhost:3000/directors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) return;

    navigate("/admin/directors");
  }

  return (
    <DirectorForm
      mode="Create"
      submitFunction={createDirector}
      form={form}
      setForm={setForm}
    />
  );
};

export default DirectorCreatePage;
