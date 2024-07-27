import React, { useEffect, useState } from "react";
import axios from "axios";

const KitsPage = () => {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    // Fetch handover kits from the backend
    axios
      .get("/api/handover-kits")
      .then((response) => setKits(response.data))
      .catch((error) => console.error("Error fetching handover kits:", error));
  }, []);

  return (
    <div>
      <h1>Handover Kits</h1>
      <ul>
        {kits.map((kit) => (
          <li key={kit._id}>
            <h2>{kit.title}</h2>
            <p>{kit.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KitsPage;
