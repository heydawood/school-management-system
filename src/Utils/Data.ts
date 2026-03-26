const chartData = [
  { name: '1', uv: 10, pv: 2400, amt: 2400 },
  { name: '2', uv: 20, pv: 1398, amt: 2210 },
  { name: '3', uv: 60, pv: 9800, amt: 2290 },
  { name: '4', uv: 80, pv: 3908, amt: 2000 },
  { name: '5', uv: 30, pv: 4800, amt: 2181 },
  { name: '6', uv: 60, pv: 4800, amt: 2181 },
  { name: '7', uv: 50, pv: 4800, amt: 2181 },
  { name: '8', uv: 40, pv: 3800, amt: 2500 },
  { name: '9', uv: 30, pv: 3800, amt: 2500 },
  { name: '10', uv: 20, pv: 3800, amt: 2500 },
  { name: '11', uv: 40, pv: 4300, amt: 2100 },
  { name: '12', uv: 60, pv: 4300, amt: 2100 },
];

const barChartData = [
  { name: '50', uv: 4000, pv: 2400 },
  { name: '55', uv: 1000, pv: 1398 },
  { name: '60', uv: 200, pv: 9800 },
  { name: '65', uv: 3080, pv: 3908 },
  { name: '70', uv: 1580, pv: 3908 },
  { name: '75', uv: 980, pv: 3908 },
  { name: '80', uv: 1380, pv: 3908 },
  { name: '85', uv: 1080, pv: 3908 },
  { name: '90', uv: 280, pv: 3908 },
];

const trendChartData = [
  { name: 'Mon', uv: 70 },
  { name: 'Tue', uv: 18 },
  { name: 'Wed', uv: 40 },
  { name: 'Thu', uv: 58 },
  { name: 'Fri', uv: 17 },
  { name: 'Sat', uv: 60 },
  { name: 'Sun', uv: 90 },
];

export const homePageData = {
  growth: {
    icon: '/icons/user-add.svg',
    title: 'Users Growth',
    tabs: [
      {
        name: 'Daily',
        value: 'daily',
      },
      {
        name: 'Weekly',
        value: 'weekly',
      },
      {
        name: 'Monthly',
        value: 'monthly',
      },
      {
        name: 'Yearly',
        value: 'yearly',
      },
    ],
    color: '#179D7C',
    date: 'Aug 30, 2025',
  },

  feature: {
    icon: '/icons/badge-percent.svg',
    title: 'Features Engagement',
    data: chartData,
    tabs: [
      {
        name: 'Workouts',
        value: 'workouts',
      },
      {
        name: 'Hydration',
        value: 'hydration',
      },
      {
        name: 'Quizzes',
        value: 'quizzes',
      },
    ],
    color: '#CE8B27',
    date: 'Aug 30, 2025',
  },

  subscription: {
    icon: '/icons/like.svg',
    title: 'Subscription Conversion',
    tabs: [
      {
        name: 'Free',
        value: 'free',
      },
      {
        name: 'Trial',
        value: 'trial',
      },
      {
        name: 'Paid',
        value: 'paid',
      },
      {
        name: 'Waiting',
        value: 'waiting',
      },
    ],
    color: '#6F46E7',
    date: 'Aug 30, 2025',
  },

  mobility: {
    icon: '/icons/chart-wave-rectangle.svg',
    title: 'Mobility Level Distribution',
    data: chartData,
    tabs: [],
    color: '#179D7C',
    date: 'Aug 30, 2025',
  },

  ageGroup: {
    icon: '/icons/chart-arrow-up.svg',
    title: 'Age Group Distribution',
    tabs: [],
    color: '#CE8B27',
    date: 'Aug 30, 2025',
  },

  heatmap: {
    icon: '/icons/digital-health.svg',
    title: 'Regional Heatmap',
    image: '/images/map.png',
    data: [],
    tabs: [],
    color: null,
    date: 'Aug 30, 2025',
  },

  emergencyAlert: {
    icon: '/icons/alert-icon.svg',
    title: 'Emergency Alert',
    image: '/images/map.png',
    data: [],
    tabs: [
      {
        name: 'Today',
        value: 'Today',
      },
      {
        name: 'Last Week',
        value: 'Last Week',
      },
      {
        name: 'Last Month',
        value: 'Last Month',
      },
      {
        name: 'Last Year',
        value: 'Last Year',
      },
    ],
    color: null,
    date: 'Aug 30, 2025',
  },

  userActivities: {
    icon: '/icons/user-block.svg',
    title: 'Latest User Activities',
    image: '/images/map.png',

    color: null,
    date: 'Aug 30, 2025',
    activities: [
      { user: 'Lester McCarthy', action: 'Pre Join Request', time: '2m' },
      { user: 'Lester McCarthy', action: 'completed workout', time: '2m' },
      { user: 'Lester McCarthy', action: 'completed quiz', time: '2m' },
      { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
      { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
      { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
      { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
    ],
  },

  adminActions: {
    icon: '/icons/user-polygon.svg',
    title: 'Latest Admin Actions',
    image: '/images/map.png',
    color: null,
    date: 'Aug 30, 2025',
    activities: [
      { user: 'Lester McCarthy', action: 'Pre Join Request', time: '2m' },
      { user: 'Lester McCarthy', action: 'completed workout', time: '2m' },
      { user: 'Lester McCarthy', action: 'completed quiz', time: '2m' },
      { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
      { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
      { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
      { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
    ],
  },

  risk: {
    icon: '/icons/bar-chart.svg',
    title: 'High Risk Today',
    image: '/images/map.png',
    color: null,
    date: 'Aug 30, 2025',
    data: [
      {
        userId: '123234',
        name: 'Lester McCarthy',
        image: '/images/user.png',
        riskScore: 85,
        location: 'London',
      },
      {
        userId: '123235',
        name: 'John Doe',
        image: '/images/user.png',
        riskScore: 90,
        location: 'New York',
      },
      {
        userId: '123236',
        name: 'Jane Smith',
        image: '/images/user.png',
        riskScore: 95,
        location: 'Los Angeles',
      },
      {
        userId: '123237',
        name: 'Alice Johnson',
        image: '/images/user.png',
        riskScore: 85,
        location: 'Chicago',
      },
    ],
  },

  recentFall: {
    icon: '/icons/chart.svg',
    title: 'Recent Fall Event',
    image: '/images/map.png',
    color: null,
    date: 'Aug 30, 2025',
    data: [
      {
        userId: '123234',
        name: 'Lester McCarthy',
        image: '/images/user.png',
        date: 'Aug 30, 2025',
        location: 'London',
      },
      {
        userId: '123235',
        name: 'John Doe',
        image: '/images/user.png',
        date: 'Aug 30, 2025',
        location: 'New York',
      },
      {
        userId: '123236',
        name: 'Jane Smith',
        image: '/images/user.png',
        date: 'Aug 30, 2025',
        location: 'Los Angeles',
      },
      {
        userId: '123237',
        name: 'Alice Johnson',
        image: '/images/user.png',
        date: 'Aug 30, 2025',
        location: 'Chicago',
      },
    ],
  },

  ageFallRisk: {
    icon: '/icons/clock-circle.svg',
    title: 'Age-Wise Fall Risk Scores',
    data: barChartData,
    bars: [{ dataKey: 'count', color: '#30B795', showLabel: true }],
    tabs: [],
    color: '#30B795',
    date: 'Aug 30, 2025',
  },
  trendChart: {
    icon: '/icons/copy.svg',
    title: 'Trend Chart: Risk Score Movement',
    data: trendChartData,
    bars: [{ dataKey: 'uv', color: '#30B795', showLabel: true }],
    tabs: [],
    color: '#30B795',
    date: 'Aug 30, 2025',
  },

  popularWorkouts: {
    icon: '/icons/dumbell.svg',
    title: 'Popular Workouts',
    image: '/images/map.png',
    color: null,
    date: 'Aug 30, 2025',
    data: [
      {
        id: '1',
        name: 'Plank',
        category: 'Core',
        competition: '3,234',
        image: '/images/logged-user.jpg',
      },
      {
        id: '2',
        name: 'Push Up',
        category: 'Strength',
        competition: '2,123',
        image: '/images/logged-user.jpg',
      },
      {
        id: '3',
        name: 'Squat',
        category: 'Legs',
        competition: '1,987',
        image: '/images/logged-user.jpg',
      },
      {
        id: '4',
        name: 'Deadlift',
        category: 'Strength',
        competition: '1,234',
        image: '/images/logged-user.jpg',
      },
      {
        id: '5',
        name: 'Lunges',
        category: 'Legs',
        competition: '1,000',
        image: '/images/logged-user.jpg',
      },
      {
        id: '6',
        name: 'Burpees',
        category: 'Full Body',
        competition: '800',
        image: '/images/logged-user.jpg',
      },
    ],
  },
};

export const usersList = [
  {
    userId: '123234',
    name: 'Lester McCarthy',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'London',
    phone: '(217) 555-0113',
  },
  {
    userId: '123235',
    name: 'John Doe',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'New York',
    phone: '(217) 555-0113',
  },
  {
    userId: '123236',
    name: 'Jane Smith',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'Los Angeles',
    phone: '(217) 555-0113',
  },
  {
    userId: '123237',
    name: 'Alice Johnson',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'Chicago',
    phone: '(217) 555-0113',
  },
  {
    userId: '123234',
    name: 'Lester McCarthy',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'London',
    phone: '(217) 555-0113',
  },
  {
    userId: '123235',
    name: 'John Doe',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'New York',
    phone: '(217) 555-0113',
  },
  {
    userId: '123236',
    name: 'Jane Smith',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'Los Angeles',
    phone: '(217) 555-0113',
  },
  {
    userId: '123237',
    name: 'Alice Johnson',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'Chicago',
    phone: '(217) 555-0113',
  },
  {
    userId: '123234',
    name: 'Lester McCarthy',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'London',
    phone: '(217) 555-0113',
  },
  {
    userId: '123235',
    name: 'John Doe',
    image: '/images/logged-user.jpg',
    date: 'Aug 30, 2025',
    location: 'New York',
    phone: '(217) 555-0113',
  },
];

export const userActivities = [
  { user: 'Lester McCarthy', action: 'Pre Join Request', time: '2m' },
  { user: 'Lester McCarthy', action: 'completed workout', time: '2m' },
  { user: 'Lester McCarthy', action: 'completed quiz', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
];

export const adminActions = [
  { user: 'Lester McCarthy', action: 'Pre Join Request', time: '2m' },
  { user: 'Lester McCarthy', action: 'completed workout', time: '2m' },
  { user: 'Lester McCarthy', action: 'completed quiz', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'logged water', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
  { user: 'Lester McCarthy', action: 'Joined', time: '2m' },
];
