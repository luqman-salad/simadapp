import apiClient from "./apiClient";

export const getInstitutionsSummary = async () => {
    try {
        const response = await apiClient.get("/institutions");
        return response.data; // { success: true, data: {...} }
    } catch (error) {
        throw error;
    }
};
