import api from '../Api';

// Get Admin Settings
export const getAdminBasicSettingsHandler = async () => {
  return api.get('admin/settings');
};

// Update Admin Settings
export const updateAdminBasicSettingsHandler = async (data: any) => {
  return api.post('admin/settings', data);
};

// Update Admin Password
export const updateAdminPasswordHandler = async (data: any) => {
  return api.patch('/v1/admins/updateMyPassword', data);
};

// Update Teacher Password
export const updateTeacherPasswordHandler = async (data: any) => {
  return api.patch('/v1/teachers/updateMyPassword', data);
};

