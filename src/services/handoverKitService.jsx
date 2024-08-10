// handoverKitService.js
import api from "./api";

const HandoverKitService = {
  getAllKits: (userId) => api.get(`/handover-kits`, { params: { userId } }), // Use params option
  getKitById: (id) => api.get(`/handover-kits/${id}`),
  createKit: (kitData) => api.post("/handover-kits", kitData),
  updateKit: (id, kitData) => api.put(`/handover-kits/${id}`, kitData),
  deleteKit: (id) => api.delete(`/handover-kits/${id}`),
};

export default HandoverKitService;
