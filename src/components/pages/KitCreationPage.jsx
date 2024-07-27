import React, { useState } from "react";

const KitCreationPage = () => {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle kit creation logic here
  };

  return (
    <div>
      <h1>Create Handover Kit</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <button type="submit">Create Kit</button>
      </form>
    </div>
  );
};

export default KitCreationPage;
