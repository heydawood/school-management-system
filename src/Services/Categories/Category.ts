import type { WorkoutLevels } from '@/Utils/Constants';
import api from '../Api';

// Create Admin Category
export const createAdminWCategoryHandler = async (data: any) => {
  return api.post('admin/workout_category', data);
};

// get Admin Categories
export const getCategoriesHandler = async () => {
  return api.get('admin/workout_category');
};

// get Admin paginated Categories
export const getPaginatedCategoriesHandler = async (filters: { isPaginated: boolean; page: number; limit: number; search: string }) => {
  return api.get(`admin/workout_category/paginated`, { params: filters });
};

// Get Admin Category Detail
export const getCategoryDetailHandler = async (id: number) => {
  return api.get(`admin/workout_category/${id}`);
};
// Update Workout Exercise
export const updateCategoryHandler = async (id: number, data: any) => {
  return api.put(`admin/workout_category/update/${id}`, data);
};

// Delete Workout Exercise
export const deleteCategoryHandler = async (id: number) => {
  return api.delete(`admin/workout_category/delete/${id}`);
};

// Get Admin Workout List
export const getWorkoutListHandler = async (filters: { page: number; limit: number; category: number | null; level: WorkoutLevels | null; search: string }) => {
  return api.get(`admin/workout`, { params: filters });
};
