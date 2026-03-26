import api from '../Api';

// Create User Profile
export const getUserProfileHandler = async (id: number) => {
  return api.get(`admin/user-management/user_detail/${id}`);
};

// Update User Status
export const updateUserStatusHandler = async (id: number) => {
  return api.patch(`admin/user-management/update_user_status/${id}`);
};
