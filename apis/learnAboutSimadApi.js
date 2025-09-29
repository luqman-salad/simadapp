import apiClient from "./apiClient";

export const getWhySimadData = async () => {
  try {
    const response = await apiClient.get("/about-university/getWhySimadData");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};
