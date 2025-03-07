import axios, { AxiosInstance } from "axios";

// Create an instance of Axios
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1" : "/api/v1",
  withCredentials: true,
});
