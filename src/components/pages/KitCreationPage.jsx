import React, { useState } from "react";
import HandoverKitService from "../services/handoverKitService";

const CreateHandoverKitPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newKit = { title, description };
    HandoverKitService.createKit(newKit)
      .then((response) => console.log("Handover Kit Created:", response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Create Handover Kit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateHandoverKitPage;
