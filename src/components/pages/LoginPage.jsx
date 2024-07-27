import React, { useState } from "react";
import api from "../../services/api"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/auth/login", form)
      .then((response) => {
        const { authToken } = response.data; // Ensure this matches backend response
        localStorage.setItem("token", authToken); // Store the JWT token
        navigate("/"); // Redirect to desired page
      })
      .catch((error) => {
        console.error("Login Error:", error.response?.data || error.message);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
