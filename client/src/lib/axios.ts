import axios, { AxiosInstance } from "axios";

// Create an instance of Axios
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api/v2" : "http://18.204.226.1/api/v2",
  withCredentials: true,
});
