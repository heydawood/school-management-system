import api from '../Api';

// Get Behavioral Analytics
export const getBehavioralAnalyticsHandler = async () => {
  return api.get('admin/analytics/behavioral');
};

// Get Feature Engagements
export const getFeatureEngagementsHandler = async (type: string) => {
  return api.get(`admin/analytics/feature_engagement?type=${type}`);
};
