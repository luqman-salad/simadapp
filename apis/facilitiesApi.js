// apis/facilitiesApis.js
import apiClient from "./apiClient";

export const getFacilities = async () => {
  try {
    const response = await apiClient.get("/facilities");
    return response.data;
  } catch (error) {
    throw error;
  }
};