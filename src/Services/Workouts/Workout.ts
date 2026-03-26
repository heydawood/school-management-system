import type { WorkoutLevels } from '@/Utils/Constants';
import api from '../Api';

// Create Admin Workout
export const createAdminWorkoutHandler = async (data: any) => {
  return api.post('admin/workout', data);
};

// Create Admin Workout Category
export const createAdminWorkoutCategoryHandler = async (data: any) => {
  return api.post('admin/workout_category', data);
};

// Update Admin Workout
export const updateAdminWorkoutHandler = async (id: number, data: any) => {
  return api.put(`admin/workout/update/${id}`, data);
};

// Update Admin Workout Status
export const updateAdminWorkoutStatusHandler = async (id: number, data: any) => {
  return api.patch(`admin/workout/update_status/${id}`, data);
};

// Delete Admin Workout
export const deleteAdminWorkoutHandler = async (id: number) => {
  return api.delete(`admin/workout/delete/${id}`);
};

// Create Admin Workout Categories
export const getWorkoutCategoriesHandler = async () => {
  return api.get('admin/workout_category');
};

// Get Admin Workout List
export const getWorkoutListHandler = async (filters: { page: number; limit: number; category: number | null; level: WorkoutLevels | null; search: string }) => {
  return api.get(`admin/workout`, { params: filters });
};

// Get Admin Workout Detail
export const getWorkoutDetailHandler = async (id: number) => {
  return api.get(`admin/workout/${id}`);
};

// Create Workout Exercise
export const createWorkoutExerciseHandler = async (data: any) => {
  return api.post(`admin/workout_exercise`, data);
};

// Update Workout Exercise
export const updateWorkoutExerciseHandler = async (id: number, data: any) => {
  return api.put(`admin/workout_exercise/update/${id}`, data);
};

// Delete Workout Exercise
export const deleteWorkoutExerciseHandler = async (id: number) => {
  return api.delete(`admin/workout_exercise/delete/${id}`);
};
