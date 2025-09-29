import apiClient from "./apiClient";

export const getHistoryAwardData = async () => {
  try {
    const response = await apiClient.get("/about-university/getHistoryAwardData");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};
