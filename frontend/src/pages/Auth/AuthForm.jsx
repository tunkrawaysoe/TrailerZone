import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type }) => {
  const isRegister = type === "register";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const { name, username, email, phoneNumber, password } = form;
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const response = await fetch(
      isRegister
        ? "http://localhost:3000/auth/register"
        : "http://localhost:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      },
    );

    const data = await response.json();

    if (response.ok) {
      navigate("/");
      return;
    }

    if (response.status === 404) {
      setError(data.message);
      setTimeout(() => navigate("/register"), 2000);
      return;
    }
    setError(data.message);
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>{isRegister ? "Create Account" : "Login"}</h1>

        {isRegister && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
            />

            <input
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />

            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handleChange}
            />
          </>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}

          <span>{isRegister ? " Login" : " Register"}</span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
