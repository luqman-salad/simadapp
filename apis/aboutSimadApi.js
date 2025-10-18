// apis/aboutApi.js
import apiClient from "./apiClient";

export const getAboutUniversity = async () => {
  try {
    const response = await apiClient.get("/about-university/about-simad");
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};