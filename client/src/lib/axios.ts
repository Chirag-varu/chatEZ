import axios, { AxiosInstance } from "axios";

// Create an instance of Axios
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
  withCredentials: true, // Send cookies when cross-origin requests

    //   timeout: 10000, // Set a timeout for requests
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

});

// // Optional: Add request interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify config before sending the request
//     // For example, add an authorization token
//     const token = localStorage.getItem("token"); // Example of getting a token
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle the error
//     return Promise.reject(error);
//   }
// );

// // Optional: Add response interceptors
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Handle the response data
//     return response.data;
//   },
//   (error) => {
//     // Handle the error response
//     return Promise.reject(error);
//   }
// );

// // Export the Axios instance
// export default axiosInstance;
