const trendChartData = [
  { name: 'Aug 01', uv: 70 },
  { name: 'Aug 02', uv: 18 },
  { name: 'Aug 03', uv: 40 },
  { name: 'Aug 04', uv: 58 },
  { name: 'Aug 05', uv: 17 },
  { name: 'Aug 06', uv: 60 },
  { name: 'Aug 07', uv: 90 },
];

const dropOffChartData = [
  { name: 'Workout', uv: 400 },
  { name: 'Hydration', uv: 300 },
  { name: 'Quizzes', uv: 200 },
];

const scatterChartData = [
  { name: 'Module A', count: 30 },
  { name: 'Module A', count: 20 },
  { name: 'Module A', count: 20 },
  { name: 'Module A', count: 20 },
  { name: 'Module A', count: 20 },
  { name: 'Module A', count: 30 },
  { name: 'Module B', count: 12 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 124 },
  { name: 'Module C', count: 200 },
  { name: 'Module C', count: 230 },
  { name: 'Module C', count: 239 },
  { name: 'Module B', count: 32 },
  { name: 'Module B', count: 124 },
  { name: 'Module B', count: 124 },
  { name: 'Module B', count: 124 },
  { name: 'Module B', count: 124 },
  { name: 'Module B', count: 29 },
];

const comparisonBarChartData = [
  { name: 'Jan', uv: 400, pv: 2400 },
  { name: 'Feb', uv: 300, pv: 1398 },
  { name: 'Mar', uv: 200, pv: 9800 },
  {
    name: 'Apr',
    uv: 278,
    pv: 3908,
  },
];

export const analyticsPageData = {
  dailyexercise: {
    icon: '/icons/dumbell.svg',
    title: 'Daily Exercise Completion',
    data: trendChartData,
    bars: [{ dataKey: 'uv', color: '#30B795', showLabel: true }],
    tabs: [],
    color: '#30B795',
    date: 'Aug 30, 2025',
  },
  streakLength: {
    icon: '/icons/clock-circle.svg',
    title: 'Streak Lengths Distribution',
    data: trendChartData,
    color: '#30B795',
    date: 'Aug 30, 2025',
  },
  dropOff: {
    icon: '/icons/chart-pie.svg',
    title: 'Drop Off Funnel',
    data: dropOffChartData,
    bars: [{ dataKey: 'uv', color: '#30B795', showLabel: true }],
    tabs: [],
    date: 'Aug 30, 2025',
    color: '#30B795',
  },
  featureEngagement: {
    icon: '/icons/like.svg',
    title: 'Feature Engagement',
    data: trendChartData,
    color: '#CE8B27',
    date: 'Aug 30, 2025',
  },
  moduleEngagement: {
    icon: '/icons/like.svg',
    title: 'Module Engagement Heatmap',
    data: scatterChartData,
    color: '#CE8B27',
    date: 'Aug 30, 2025',
  },
  quizCompletion: {
    icon: '/icons/like.svg',
    title: 'Quiz Completion & Accuracy',
    data: comparisonBarChartData,
    bars: [
      { dataKey: 'pv', color: '#EFA22F', showLabel: true, yAxisId: 'left' },
      { dataKey: 'uv', color: '#30B795', showLabel: true, yAxisId: 'right' },
    ],
    color: '#CE8B27',
    date: 'Aug 30, 2025',
  },
  timeSpent: {
    icon: '/icons/clock-circle.svg',
    title: 'Time Spent Per Topic',
    data: trendChartData,
    color: '#CE8B27',
    date: 'Aug 30, 2025',
  },
};

// Analytics Page Tabs
export const AnalyticsPageTabs = [
  { name: 'Behavioral Analytics', value: 'behavioralAnalytics', disabled: false },
  { name: 'Educational Analytics', value: 'educationalAnalytics', disabled: true },
];

export enum AnalyticsPageTabsTypes {
  BehavioralAnalytics = 'behavioralAnalytics',
  EducationalAnalytics = 'educationalAnalytics',
}

// Feature Engagement Tabs
export const FeatureEngagementTabs = [
  { name: 'Workouts', value: 'WORKOUT' },
  { name: 'Hydrations', value: 'HYDRATION' },
  { name: 'Steps', value: 'STEPS' },
];

export enum FeatureEngagementTabsTypes {
  Workouts = 'WORKOUT',
  Hydrations = 'HYDRATION',
  Quizzes = 'STEPS',
}

// Module Engagement Tabs
export const moduleEngagementTabs = [
  { name: 'Weekly', value: 'Weekly' },
  { name: 'Monthly', value: 'Monthly' },
  { name: 'Yearly', value: 'Yearly' },
];

export enum ModuleEngagementTabsTypes {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

// Quiz Completion Tabs
export const quizCompletionTabs = [
  { name: 'Weekly', value: 'Weekly' },
  { name: 'Monthly', value: 'Monthly' },
  { name: 'Yearly', value: 'Yearly' },
];

export enum QuizCompletionTabsTypes {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}

// Time Spent Tabs
export const timeSpentTabs = [
  { name: 'Weekly', value: 'Weekly' },
  { name: 'Monthly', value: 'Monthly' },
  { name: 'Yearly', value: 'Yearly' },
];

export enum TimeSpentTabsTypes {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}
