export interface UserProfileResponse {
  userId: number;
  avatar: string;
  name: string;
  phone: string;
  country: string;
  gender: string;
  email: any;
  isActive: boolean;
  age: number;
  height: any;
  weight: any;
  address: any;
  accountPlan: string;
  userDropOff: UserDropOffItem[];
  subscriptions: UserSubscription[];
  userSegment: string;
  hydrationStats: HydrationStateItem[];
  stepsStats: StepsStateItem[];
  workoutStats: WorkoutStatsItem[];
  emergencyIncidents: EmergencyAtertLogItem[];
}

export interface EmergencyAtertLogItem {
  alertCallDate: string;
  contactPerson: string;
  status: 'Resolved' | 'Unresolved' | 'In Progress';
}

export interface UserDropOffItem {
  type: string;
  dropOffCount: number;
}
export interface HydrationStateItem {
  date: string;
  intakeQty: number;
  dailyTarget: number;
  reachedTarget: number;
}

export interface StepsStateItem {
  date: string;
  steps: number;
  dailyTarget: number;
  reachedTarget: number;
}

export interface WorkoutStatsItem {
  completeDate: string;
  count: number;
  reachedTarget: number;
}

export interface UserSubscription {
  userSubscriptionId: number;
  subscriptionStartDate: any;
  subscriptionEndDate: any;
  status: string;
  nameEn: string;
}
