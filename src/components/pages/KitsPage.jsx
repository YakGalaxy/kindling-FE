import React, { useEffect, useState } from "react";
import HandoverKitService from "../services/handoverKitService";

const HandoverKitsPage = () => {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    HandoverKitService.getAllKits()
      .then((response) => setKits(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Handover Kits</h1>
      <ul>
        {kits.map((kit) => (
          <li key={kit._id}>{kit.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HandoverKitsPage;
