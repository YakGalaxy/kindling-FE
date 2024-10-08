import api from "./api";

const ProfileService = {
  // Fetch a specific profile by ID
  getProfileById: (id) => api.get(`/profiles/${id}`),

  // Update a specific profile by ID
  updateProfile: (id, profileData) => api.put(`/profiles/${id}`, profileData),
};

export default ProfileService;
