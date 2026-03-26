import api from '../Api';

export const getUserManagementDataHandler = async (page: number, limit: number) => {
  return api.get('admin/user-management', { params: { page, limit } });
};

export const getPaginatedUserManagementDataHandler = async (data: any) => {
  return api.get('admin/user-management/paginated', { params: data });
};

export const getFiltersMetahandler = async () => {
  return api.get('admin/user-management/meta_data');
};

// Export User Management Data
export const exportUsersHandler = async () => {
  return api.get('admin/user-management/export', {
    responseType: 'blob',
    headers: { Accept: 'text/csv' },
  });
};
