// apis/universityApis.js
import apiClient from "./apiClient";

export const getUniversityStats = async () => {
  try {
    const response = await apiClient.get("/about-university/stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};