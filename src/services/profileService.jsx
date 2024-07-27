import api from "./api";

const ProfileService = {
  getProfile: () => api.get("/profile"),
  updateProfile: (profileData) => api.put("/profile", profileData),
};

export default ProfileService;
