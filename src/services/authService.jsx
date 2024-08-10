export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profileId"); // Clear profile ID
  window.location.href = "/"; // Redirect to login or home page
};
