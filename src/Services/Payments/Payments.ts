import api from '../Api';

export const getPaymentsDataHandler = async (page: number, limit: number, plan?: number | null, search?: string | null, startDate?: Date | null, endDate?: Date | null) => {
  return api.get('admin/payments', { params: { page, limit, plan, search, startDate, endDate } });
};

export const getPaginatedPaymentsDataHandler = async (page: number, limit: number) => {
  return api.get('admin/payments/paginated', { params: { page, limit } });
};

export const getPaymentDetailHandler = async (id: number) => {
  return api.get(`admin/payments/payment_detail/${id}`);
};

// Export payments

export const exportPaymentsHandler = async (page: number, limit: number, plan?: number | null, search?: string | null, startDate?: Date | null, endDate?: Date | null) => {
  return api.get('admin/payments/export', {
    params: { page, limit, plan, search, startDate, endDate },
    responseType: 'blob',
    headers: { Accept: 'text/csv' },
  });
};

export const getPaymentPlansDataHandler = async () => {
  return api.get('admin/plan');
};
