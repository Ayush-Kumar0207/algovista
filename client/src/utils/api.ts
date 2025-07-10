import axios from "axios";

// Create a new Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ Your backend base URL
  withCredentials: true, // Set to true if using cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor (e.g., handle token expiry globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional global error handling
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized: Redirecting to login");
      // You can handle logout here or show toast
      // e.g., window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
