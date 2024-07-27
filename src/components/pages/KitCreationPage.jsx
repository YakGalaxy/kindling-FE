import React from "react";

const KitCreationPage = () => {
  return (
    <div>
      <h1>Create Handover Kit</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <br />
        <button type="submit">Create Kit</button>
      </form>
    </div>
  );
};

export default KitCreationPage;
