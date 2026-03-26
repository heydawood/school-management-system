import api from '../Api';

export const getSubscriptionDataHandler = async () => {
  return api.get('admin/plan');
};

export const putSubscriptionDataHandler = async (planId: string, payload: any) => {
  const response = await api.put(`admin/plan/${planId}`, payload);
  return response.data;
};

export const removeSubscriptionFeatureHandler = async (planId: string) => {
  const response = await api.delete(`admin/plan/${planId}`);
  return response.data;
};
