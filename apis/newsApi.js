// apis/newsApis.js
import apiClient from "./apiClient";

export const getActiveNews = async () => {
  try {
    const response = await apiClient.get("/updates/active-news");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};