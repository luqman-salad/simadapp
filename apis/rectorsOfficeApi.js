import apiClient from "./apiClient";

export const getRectorsMessage = async () => {
  try {
    const response = await apiClient.get("/about-university/getRectorsMessage");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};
