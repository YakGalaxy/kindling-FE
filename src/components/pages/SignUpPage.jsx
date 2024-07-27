import React, { useState } from "react";
import api from "../../services/api"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (form.password.length < 3) {
      alert("Password must be at least 3 characters long.");
      return;
    }

    api
      .post("/auth/signup", form) // Using the API service instance
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        alert(
          "An error occurred: " +
            (error.response?.data?.error || "Please try again")
        );
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
