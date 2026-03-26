import type { BasicSettingsResponse } from '@/pages/Dashboard/Settings/Types';

export interface SettingsFormTypes {
  avatar: string;
  name: string;
  email: string;
  language: string;
  enableEmailAlerts: boolean;
  enableSubscriptionAlerts: boolean;
  enablePaymentIssueAlert: boolean;
  enableEmergencyAlerts: boolean;
}

export const SettingsFormDefaultValues: SettingsFormTypes = {
  avatar: '',
  name: '',
  email: '',
  language: 'en',
  enableEmailAlerts: false,
  enableSubscriptionAlerts: false,
  enablePaymentIssueAlert: false,
  enableEmergencyAlerts: false,
};

export const SetSettingsFormDefaultValues = (settings: BasicSettingsResponse) => {
  return {
    avatar: settings.shortAvatarUrl,
    name: settings.name || '',
    email: settings.email || '',
    language: 'en',
    enableEmailAlerts: settings.enableEmailAlerts || false,
    enableSubscriptionAlerts: settings.enableSubscriptionAlerts || false,
    enablePaymentIssueAlert: settings.enablePaymentIssueAlert || false,
    enableEmergencyAlerts: settings.enableEmergencyAlerts || false,
  };
};
