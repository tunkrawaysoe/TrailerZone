import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DirectorForm from "../../../components/admin/DirectorForm";

const DirectorEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    biography: "",
    birthDate: "",
  });

  useEffect(() => {
    async function fetchDirector() {
      const response = await fetch(`http://localhost:3000/directors/${id}`);

      if (!response.ok) return;

      const director = await response.json();

      setForm({
        name: director.name || "",
        biography: director.biography || "",
        birthDate: director.birthDate ? director.birthDate.slice(0, 10) : "",
      });
    }

    fetchDirector();
  }, [id]);

  async function editDirector(e) {
    e.preventDefault();
    const data = {
      ...form,
      birthDate: form.birthDate ? form.birthDate : null,
    };
    console.log("data", data);
    const response = await fetch(`http://localhost:3000/directors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) return;
    navigate("/admin/directors");
  }

  return (
    <DirectorForm
      mode="Edit"
      submitFunction={editDirector}
      form={form}
      setForm={setForm}
    />
  );
};

export default DirectorEditPage;
