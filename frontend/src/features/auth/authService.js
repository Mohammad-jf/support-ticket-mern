import axios from "axios";

const API_URL_register = "/api/users";
const API_URL_login = "/api/users/login";

//  register user
const register = async (userData) => {
  const response = await axios.post(API_URL_register, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout
const logout = () => {
  localStorage.removeItem("user");
};

//  login user
const login = async (userData) => {
  const response = await axios.post(API_URL_login, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
