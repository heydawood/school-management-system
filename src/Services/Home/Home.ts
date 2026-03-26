import type { EmergencyAlertModalTabsTypes } from '@/pages/Dashboard/Home/Utils';
import api from '../Api';

// Get dashboard data
export const getDashboardDataHandler = async () => {
  return api.get('admin/dashboard');
};

// Remind single member
export const remindSingleMemberHandler = async (userId: number) => {
  return api.post(`admin/dashboard/remind_single_member/${userId}`);
};

// Remind all member
export const remindAllMembersHandler = async (userIds: number[]) => {
  return api.post('admin/dashboard/remind_all_members', { userIds });
};

// Get user growth stats
export const getUserGrowthStatsHandler = async (userGrowthFilter: any) => {
  return api.get('admin/dashboard/user_growth_stats', { params: { userGrowthFilter } });
};

// Get subqscription stats
export const getSubscriptionStatsHandler = async (plan: any) => {
  return api.get('admin/dashboard/subscription_stats', { params: { plan } });
};

// Get user activities
export const getUserActivitiesHandler = async (data: { page: number; limit: number }) => {
  return api.get(`admin/dashboard/get_user_activities`, { params: data });
};

// Get admin activities
export const getAdminActivitiesHandler = async (data: { page: number; limit: number }) => {
  return api.get(`admin/dashboard/get_admin_activities`, { params: data });
};

// Get emergency alerts
export const getEmergencyAlertsHandler = async (data: { page: number; limit: number; startDate: any; endDate: any }) => {
  return api.get(`admin/dashboard/get_emergency_alerts`, { params: data });
};

// Today high risk
export const todayHighRiskHandler = async (data: { page: number; limit: number }) => {
  return api.get(`admin/dashboard/today_high_risk`, { params: data });
};

// Recent fall event
export const recentFallEventHandler = async (data: { page: number; limit: number }) => {
  return api.get(`admin/dashboard/recent_fall_events`, { params: data });
};
