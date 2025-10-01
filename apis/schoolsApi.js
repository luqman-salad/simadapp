// apis/schoolsApis.js
import apiClient from "./apiClient";

export const getSchoolInfoById = async (schoolId) => {
  try {
    const response = await apiClient.get(`/schools/getSchoolsInfoByID/${schoolId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};