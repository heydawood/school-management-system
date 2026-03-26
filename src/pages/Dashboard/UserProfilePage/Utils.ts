import type { INPUT_VALIDATION_RULES } from 'node_modules/react-hook-form/dist/constants';

const chartData = [
  { name: 'Hydration', uv: 10 },
  { name: 'Steps', uv: 20 },
  { name: 'Workout', uv: 60 },
];

export const profileData = {
  hydration: {
    icon: '/icons/droplet.svg',
    title: 'Hydration',
    data: chartData,
    tabs: [],
    color: '#46B2E7',
    date: 'Aug 30, 2025',
  },

  steps: {
    icon: '/icons/steps.svg',
    title: 'Steps',
    data: chartData,
    tabs: [],
    color: '#CE8B27',
    date: 'Aug 30, 2025',
  },

  workout: {
    icon: '/icons/dumbell.svg',
    title: 'Workout',
    data: chartData,
    tabs: [],
    date: 'Aug 30, 2025',
    color: '#30B795',
  },

  dropOff: {
    icon: '/icons/alert-icon.svg',
    title: 'Drop Off Points',
    data: chartData,
    bars: [{ dataKey: 'count', color: '#30B795', showLabel: true }],
    tabs: [],
    date: 'Aug 30, 2025',
    color: '#FF453A',
  },

  subscriptionHistory: [
    {
      id: 1,
      startDate: '30 Jul, 2025',
      endDate: '31 Jul, 2025',
      plan: 'Premium Tier',
      status: 'Active',
    },
    {
      id: 2,
      startDate: '30 Jul, 2025',
      endDate: '31 Jul, 2025',
      plan: 'Basic Tier',
      status: 'Inactive',
    },
    {
      id: 3,
      startDate: '30 Jul, 2025',
      endDate: '31 Jul, 2025',
      plan: 'Free Tier',
      status: 'Pending',
    },
    {
      id: 4,
      startDate: '30 Jul, 2025',
      endDate: '31 Jul, 2025',
      plan: 'Free Tier',
      status: 'Active',
    },
  ],

  emergencyLogs: [
    // {
    //   id: 1,
    //   alertCallDate: '30 Jul, 2025',
    //   contactPerson: 'John Doe',
    //   status: 'Active',
    // },
    // {
    //   id: 2,
    //   alertCallDate: '31 Jul, 2025',
    //   contactPerson: 'Jane Smith',
    //   status: 'Inactive',
    // },
    // {
    //   id: 3,
    //   alertCallDate: '01 Aug, 2025',
    //   contactPerson: 'Alice Johnson',
    //   status: 'Pending',
    // },
    // {
    //   id: 4,
    //   alertCallDate: '02 Aug, 2025',
    //   contactPerson: 'Bob Brown',
    //   status: 'Active',
    // },
  ],
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

export const getStatusBadge = (status: string) => {
  const transformedStatus = status.toLowerCase();
  const statusMap: Record<string, string> = {
    active: 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    inactive: 'bg-error-25 text-error-800 hover:bg-error-50',
    pending: 'bg-warning-50 text-warning-800 hover:bg-warning-50',
  };
  const statusClass = statusMap[transformedStatus] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return statusClass;
};

export const getEmergencyLogsStatusBadge = (status: 'Resolved' | 'Unresolved') => {
  const transformedStatus = status.toLowerCase();
  const statusMap: Record<string, string> = {
    resolved: 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    unresolved: 'bg-error-25 text-error-800 hover:bg-error-50',
  };
  const statusClass = statusMap[transformedStatus] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return statusClass;
};
