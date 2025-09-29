import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://simad-portal-api.vercel.app/api/v1/app", // common base
  timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
