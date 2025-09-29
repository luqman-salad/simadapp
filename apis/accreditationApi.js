import apiClient from "./apiClient";

export const getAccreditationsData = async () => {
  try {
    const response = await apiClient.get("/about-university/getAccreditationsData");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};
