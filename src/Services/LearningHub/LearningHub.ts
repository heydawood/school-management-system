import type { WorkoutLevels } from '@/Utils/Constants';
import api from '../Api';

// get Admin diet plans
export const getLearningHubHandler = async (filters: { page: number; limit: number }) => {
  return api.get(`admin/diet_plan`, { params: filters });
};

// Create Admin diet plans
export const createAdminLearningHubHandler = async (data: any) => {
  return api.post('admin/diet_plan', data);
};

// Get Admin diet plans
export const getLearningHubDetailHandler = async (id: number) => {
  return api.get(`admin/diet_plan/${id}`);
};
// Update diet plans
export const updateLearningHubHandler = async (id: number, data: any) => {
  return api.put(`admin/diet_plan/${id}`, data);
};

// Delete diet plans
export const deleteLearningHubHandler = async (id: number) => {
  return api.delete(`admin/diet_plan/${id}`);
};
