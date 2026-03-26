export interface DashboardDataResponse {
  allUsers: string;
  activeUsers: string;
  last30DysUsers: string;
  totalRevenue: string;
  userGrowth: UserGrowth[];
  userAgeGroup: UserAgeGroup[];
  subscriptionConversion: SubscriptionConversion[];
  mobilityLevelDistribution: MobilityLevel[];
  adminActivities: Activity[];
  userActivities: Activity[];
  userAlerts: AlertUser[];
  mostPopularWorkouts: MostPopularWorkout[];
  regionalHeatMap: RegionalHeatMapItem[];
  recentFallEvents: RecentFallEvent[];
  ageWiseFallRiskScore: AgeWiseRiskFallScore[];
  todayHighRisks: TodayHighRisk[];
  riskScoreMovement: RiskScoreMovement[];
}

export interface RiskScoreMovement {
  scoreDate: string;
  users: number;
}

export interface AgeWiseRiskFallScore {
  age: string;
  users: number;
}

export interface TodayHighRisk {
  userId: number;
  name: string;
  avatar: any;
  address: string;
  score: string;
}

export interface RecentFallEvent {
  userId: number;
  name: string;
  avatar: any;
  fallDateTime: string;
  location: string;
}

export interface RegionalHeatMapItem {
  userId: string;
  name: string;
  avatar: string;
  latitude: string;
  longitude: string;
}

export interface MostPopularWorkout {
  title: string;
  image: string;
  level: string;
  totalCount: number;
}

export interface UserGrowth {
  date: string;
  users: number;
}

export interface UserAgeGroup {
  age: string;
  users: number;
}

export interface SubscriptionConversion {
  date: string;
  subscriptions: number;
}

export interface MobilityLevel {
  level: string;
  completed: number;
}

export interface Activity {
  userActivityId: number;
  content: string;
  createdAt: string;
}

export interface AlertUser {
  userId: number;
  name: string;
  phone: string;
  latitude: string;
  longitude: string;
  avatar: string;
  isReminded: boolean;
}
