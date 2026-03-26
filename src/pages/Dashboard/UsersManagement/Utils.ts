export const userManagementAnalyticsData = [
  {
    title: 'Free Users Listed',
    value: '12,450',
  },
  {
    title: 'Trial Users Listed',
    value: '12,450',
  },
  {
    title: 'Waiting Users Listed',
    value: '12,450',
  },
  {
    title: 'Paid Users Listed',
    value: '12,450',
  },
  {
    title: 'Listed Care Givers',
    value: '52,450',
  },
];

export const getStatusBadge = (isActive: boolean) => {
  const statusMap: Record<string, string> = {
    Active: 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    Inactive: 'bg-error-25 text-error-800 hover:bg-error-50',
    Pending: 'bg-warning-50 text-warning-800 hover:bg-warning-50',
    
  };
  const statusClass = statusMap[isActive ? 'Active' : 'Inactive'] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return statusClass;
};

export const getTierBadge = (tier: string) => {
  const tierMap: Record<string, string> = {
    'Free Tier': 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    'Basic Tier': 'bg-warning-50 text-warning-800 hover:bg-warning-50',
    'Premium Tier': 'bg-blue-50 text-blue-800 hover:bg-blue-50',
  };
  const tierClass = tierMap[tier] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return tierClass;
};

export const getRoleBadge = (role: string) => {
  const roleMap: Record<string, string> = {
    'Care Giver': 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    User: 'bg-warning-50 text-warning-800 hover:bg-warning-50',
  };
  const roleClass = roleMap[role] || 'bg-neutral-975 text-gray-800 hover:bg-gray-50';
  return roleClass;
};
