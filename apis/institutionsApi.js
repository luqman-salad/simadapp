import apiClient from "./apiClient";

export const getInstitutions = async () => {
  try {
    const response = await apiClient.get("/institutions/summary");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInstitutionDetails = async (institutionId) => {
  try {
    const response = await apiClient.get(`/institutions/${institutionId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};