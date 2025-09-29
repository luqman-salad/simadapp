import apiClient from "./apiClient"; // shared axios instance


export const getVisionAndMission = async () => {
  try {
    const res = await apiClient.get(
      "/about-university/getUniVisionAndMission"
    );
    return res.data;
  } catch (error) {
    console.error("API Error (Vision & Mission):", error.message);
    throw error;
  }
};
