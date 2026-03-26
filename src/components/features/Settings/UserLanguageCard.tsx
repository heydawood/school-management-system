import type { UseFormReturn } from 'react-hook-form';
import StatChartCard from '../Dashboard/StatChartCard';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import Icon from '@/components/ui/svg_icon/SvgIcon';

const UserLanguageCard = () => {
  return (
    <div className="mt-4">
      <StatChartCard date={''} withDate={false} icon={'/icons/lock.svg'} title={'Languages Default'}>
        <div className="mt-4">
          <Dropdown
            icon={<Icon icon="/icons/globe.svg" />}
            name="language"
            placeholder="Select Language"
            label="Default Language"
            allowAsterisk
            data={[{ value: 'en', name: 'English' }]}
          />
        </div>
      </StatChartCard>
    </div>
  );
};

export default UserLanguageCard;
