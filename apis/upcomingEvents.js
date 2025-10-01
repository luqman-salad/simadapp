// apis/eventsApis.js
import apiClient from "./apiClient";

export const getUpcomingEvents = async () => {
  try {
    const response = await apiClient.get("/updates/upcoming-events");
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw error;
  }
};