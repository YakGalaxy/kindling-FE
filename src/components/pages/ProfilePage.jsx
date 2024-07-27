import React, { useEffect, useState } from "react";
import ProfileService from "../services/profileService";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    ProfileService.getProfile()
      .then((response) => setProfile(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ProfileService.updateProfile(profile)
      .then((response) => console.log("Profile Updated:", response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profile.username || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;
