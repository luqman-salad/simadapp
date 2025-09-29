import apiClient from "./apiClient";

export const getSenateList = async () => {
  try {
    const response = await apiClient.get("/about-university/getSenateList");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};
