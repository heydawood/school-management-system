import type { Pagination } from '@/Utils/Types';

export interface UserManagementResponse {
  freeUsersCount: string;
  trialUsersCount: number;
  waitingUsersCount: string;
  paidUsersCount: number;
  careGiverCount: number;
  users: UserManagementUser[];
  meta: Pagination;
}

export interface UserManagementUser {
  userId: string;
  name?: string;
  phone: string;
  recentDropOff: string;
  email: string;
  phoneCountryCode: string;
  role: string;
  isActive: boolean;
  plan: string;
  lastActivity: Date;
}

// Filters Respons
export interface FiltersMetaResponse {
  plans: Item[];
  status: Item[];
  ages: Item[];
  country: Item[];
  mobility: Item[];
}

export interface Item {
  label: string;
  value: number | boolean | string;
}
