export interface BehavioralAnalyticsResponse {
  completedExercises: CompletedExercise[];
  userDropOffs: UserDropOff[];
  featureEngagements: FeatureEngagement[];
}

export interface CompletedExercise {
  date: string;
  count: number;
}

export interface UserDropOff {
  type: string;
  dropOffCount: number;
}

export interface FeatureEngagement {
  dropOffDate: string;
  dropOffCount: number;
}
