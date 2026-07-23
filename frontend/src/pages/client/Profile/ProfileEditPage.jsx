import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileEditPage = () => {
  const user = useSelector((state) => state.user.profile);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    profilePicture: user?.profilePicture || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/me", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) return;
    navigate("/profile");
  }

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture || "",
    });
  }, [user]);

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-card" onSubmit={handleSubmit}>
        <h1>Edit Profile</h1>

        <div className="profile-preview">
          {form.profilePicture ? (
            <img src={form.profilePicture} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {form.name ? form.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </div>

        <input
          type="text"
          name="profilePicture"
          placeholder="Profile Picture URL"
          value={form.profilePicture}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <div className="buttons">
          <button type="submit">Save Changes</button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditPage;
