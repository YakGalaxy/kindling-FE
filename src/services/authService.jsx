export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirect to login or home page
};
