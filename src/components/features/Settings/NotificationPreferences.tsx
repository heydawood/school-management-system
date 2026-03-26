import type { UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Switcher from '@/components/ui/switch/Switch';
import type { SettingsFormTypes } from '@/Forms/Settings';

interface Props {
  form: UseFormReturn<SettingsFormTypes>;
}

const NotificationPrefCard = ({ form }: Props) => {
  const { setValue, watch, getValues } = form;
  return (
    <div className="mt-4">
      <StatChartCard date={''} withDate={false} icon={'/icons/notification.svg'} title={'Notification Preferences'}>
        <div className="mt-4">
          <div className="my-4">
            <Switcher
              isChecked={watch('enableEmailAlerts')}
              onToggle={(checked) => setValue('enableEmailAlerts', checked)}
              label="Email Notifications"
              labelPosition="left"
              className="flex justify-between"
            />
          </div>
          <div className="my-4">
            <Switcher
              isChecked={watch('enableSubscriptionAlerts')}
              onToggle={(checked) => setValue('enableSubscriptionAlerts', checked)}
              label="Subscription Alert"
              labelPosition="left"
              className="flex justify-between"
            />
          </div>
          <div className="my-4">
            <Switcher
              isChecked={watch('enablePaymentIssueAlert')}
              onToggle={(checked) => setValue('enablePaymentIssueAlert', checked)}
              label="Payment Issues"
              labelPosition="left"
              className="flex justify-between"
            />
          </div>
          <div className="my-4">
            <Switcher
              isChecked={watch('enableEmergencyAlerts')}
              onToggle={(checked) => setValue('enableEmergencyAlerts', checked)}
              label="Emergency Alerts"
              labelPosition="left"
              className="flex justify-between"
            />
          </div>
        </div>
      </StatChartCard>
    </div>
  );
};

export default NotificationPrefCard;
