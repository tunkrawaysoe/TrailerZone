import React, { useState } from "react";
import CreateAndEditActor from "../../../components/admin/CreateAndEditActor";
import { useNavigate } from "react-router-dom";

const ActorCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    profileImage: "",
    biography: "",
    birthDate: "",
  });

  async function createActor(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/actors", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      navigate("/admin/actors");
    } else {
      console.error("Failed to create actor");
    }
  }

  return (
    <CreateAndEditActor
      form={form}
      setForm={setForm}
      submitFunction={createActor}
      mode="Create"
    />
  );
};

export default ActorCreatePage;
