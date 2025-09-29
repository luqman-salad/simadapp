// apis/partnersApis.js
import apiClient from "./apiClient";

export const getPartners = async () => {
  try {
    const response = await apiClient.get("/partners");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};