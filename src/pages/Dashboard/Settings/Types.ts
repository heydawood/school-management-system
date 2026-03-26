export interface BasicSettingsResponse {
  name: string;
  email: string;
  avatar: string;
  shortAvatarUrl: string;
  enableEmailAlerts: boolean;
  enableSubscriptionAlerts: boolean;
  enablePaymentIssueAlert: boolean;
  enableEmergencyAlerts: boolean;
}

export interface AdminSystemSettingsResponse {
  appUsages: AppUsage[];
  userSupportQuestions: UserSupportQuestion[];
  userFeedBackSummary: UserFeedbackSummary[];
}

export interface UserFeedbackSummary {
  label: string;
  percentage: number;
}

export interface UserSupportQuestion {
  userId: number;
  userName: string;
  userAvatar: string;
  userPhoneNo: string;
  date: string;
  message: string;
  level: string;
}

export interface AppUsage {
  date: string;
  active: number;
  idle: number;
}
