import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://quiz-mania-backend.herokuapp.com/`,
});

//axios instance for requests which require authorization by token
export const axiosAuthorization = axios.create({
  baseURL: `https://quiz-mania-backend.herokuapp.com/`,
});

axiosAuthorization.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") ?? null;
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  console.log("Token inside axiosInstance config: ", { token });
  console.log("axios interceptor config: ", config);
  return config;
});

export default axiosInstance;