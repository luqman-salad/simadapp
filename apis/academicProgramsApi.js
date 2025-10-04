// apis/programApis.js
import apiClient from "./apiClient";


export const getAvailableProgramsInfo = async () => {
  try {
    const response = await apiClient.get("/programs/getAvaliableProgramsInfo");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProgramsCategories = async () => {
  try {
    const response = await apiClient.get("/program-categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProgramsByCategoryId = async (categoryId) => {
  try {
    const response = await apiClient.get(`/schools/getSchoolsByCategoryID/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProgramInfoById = async (programId) => {
  try {
    const response = await apiClient.get(`/programs/getProgramsInfoByID/${programId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};