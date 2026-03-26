import api from '../Api';

// Get Admin Settings
export const getAdminBasicSettingsHandler = async () => {
  return api.get('admin/settings');
};

// Update Admin Settings
export const updateAdminBasicSettingsHandler = async (data: any) => {
  return api.post('admin/settings', data);
};

// // Get Admin System Settings
// export const getAdminSystemSettingsHandler = async () => {
//   return api.get('admin/settings/system_monitoring');
// };

// // Get App Usage
// export const getSettingsAppUsageHandler = async (data: { startDate: string | null; endDate: string | null }) => {
//   return api.get('admin/settings/app_usage', { params: data });
// };

// // Get User Feedback Summary
// export const getUserFeedbackSummaryHandler = async (data: { startDate: string | null; endDate: string | null }) => {
//   return api.get('admin/settings/user_feed_back_summary', { params: data });
// };

// // Get User Support Questions
// export const getUserSupportQuestionsHandler = async (page: number, limit: number) => {
//   return api.get('admin/settings/user_support_questions', { params: { page, limit } });
// };

// Update Admin Password
export const updateAdminPasswordHandler = async (data: any) => {
  return api.patch('/v1/admins/updateMyPassword', data);
};
