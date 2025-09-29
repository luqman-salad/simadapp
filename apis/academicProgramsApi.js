// apis/programApis.js
import apiClient from "./apiClient";

export const getProgramsCategories = async () => {
  try {
    const response = await apiClient.get("/program-categories");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};

export const getProgramsByCategoryId = async (categoryId) => {
  try {
    const response = await apiClient.get(`/schools/getSchoolsByCategoryID/${categoryId}`);
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};