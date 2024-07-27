// src/components/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    preferences: "",
  });

  useEffect(() => {
    // Fetch user profile from the backend
    axios
      .get("/api/profile")
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    axios
      .put("/api/profile", profile)
      .then((response) => console.log("Profile updated:", response.data))
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Preferences:
          <textarea
            name="preferences"
            value={profile.preferences}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
