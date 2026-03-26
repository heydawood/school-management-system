export const categoryStatus = [
  { name: 'Active', value: 'Active' },
  { name: 'Inactive', value: 'Inactive' },
];

export const getCategoryStatusBadge = (status: boolean) => {
  const statusMap: Record<'success' | 'error', string> = {
    success: 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    error: 'bg-error-25 text-error-800 hover:bg-error-50',
  };
  return status ? statusMap.success : statusMap.error;
};
