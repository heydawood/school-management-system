const chartData = [
  { name: 'Feature Request', count: 82 },
  { name: 'Confusion', count: 46 },
  { name: 'App Crash', count: 10 },
  { name: 'App Crash', count: 10 },
];

const comparisonChartData = [
  { name: 'Jan', active: 4000, inactive: 2400 },
  { name: 'Feb', active: 3000, inactive: 1398 },
  { name: 'Mar', active: 2000, inactive: 9800 },
];
const pieChartData = [
  { name: 'Feature Request', value: 82 },
  { name: 'Confusion', value: 46 },
  { name: 'App Crash', value: 10 },
];

export const settingsTabs = [
  {
    name: 'Basic Settings',
    value: 'basic',
  },
  {
    name: 'System Monitering',
    value: 'system',
  },
];

export enum SettingsTabsTypes {
  BASIC = 'basic',
  SYSTEM = 'system',
}

export const getReportLevelBadge = (level: string) => {
  const levelMap: Record<string, string> = {
    Warning: 'bg-warning-25 text-warning-800 hover:bg-warning-50',
    Error: 'bg-error-25 text-error-800 hover:bg-error-50',
    'Feature Request': 'bg-success-25 text-success-800 hover:bg-success-50',
  };
  const levelClass = levelMap[level] || 'bg-gray-25 text-gray-800 hover:bg-gray-50';
  return levelClass;
};

// User growth tabs
export const AppUsageTabs = [
  {
    name: 'Weekly',
    value: 'Weekly',
  },
  {
    name: 'Monthly',
    value: 'Monthly',
  },
  {
    name: 'Yearly',
    value: 'Yearly',
  },
];

export enum AppUsageTabsTypes {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

// User feedback tabs
export const userFeedbackTabs = [
  {
    name: 'Weekly',
    value: 'Weekly',
  },
  {
    name: 'Monthly',
    value: 'Monthly',
  },
  {
    name: 'Yearly',
    value: 'Yearly',
  },
];

export enum UserFeedbackTabsTypes {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

export const SettingsData = {
  appUsage: {
    icon: '/icons/like.svg',
    title: 'App Usage Heatmap',
    date: 'Aug 30, 2025',
    data: comparisonChartData,
  },
  userFeedback: {
    icon: '/icons/notes-favourite.svg',
    title: 'User Feedback Summary',
    date: 'Aug 30, 2025',
    data: pieChartData,
  },
};

export const reportsTableData = [
  {
    id: 1,
    name: 'John Doe',
    image: null,
    phone: '+1234567890',
    date: '2023-10-01T10:00:00Z',
    level: 'Warning',
    message: 'ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: null,
    phone: '+0987654321',
    date: '2023-10-02T11:30:00Z',
    level: 'Error',
    message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: null,
    phone: '+1122334455',
    date: '2023-10-03T09:15:00Z',
    level: 'Warning',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: null,
    phone: '+1122334455',
    date: '2023-10-03T09:15:00Z',
    level: 'Warning',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: null,
    phone: '+1122334455',
    date: '2023-10-03T09:15:00Z',
    level: 'Warning',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: null,
    phone: '+1122334455',
    date: '2023-10-03T09:15:00Z',
    level: 'Warning',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: null,
    phone: '+1122334455',
    date: '2023-10-03T09:15:00Z',
    level: 'Warning',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: null,
    phone: '+1122334455',
    date: '2023-10-03T09:15:00Z',
    level: 'Warning',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: null,
    phone: '+1122334455',
    date: '2023-10-03T09:15:00Z',
    level: 'Warning',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];
