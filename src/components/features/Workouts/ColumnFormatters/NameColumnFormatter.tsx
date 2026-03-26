import { Avatar, AvatarImage } from '@/components/ui/avatar';
import type { Workout } from '@/pages/Dashboard/Workouts/Types';
import { truncateText } from '@/Utils/Helpers';

export const NameFormatter = (row: Workout) => {
  return (
    <div className="flex w-[200px] gap-5 py-2 items-center">
      <div className="text-sm font-semibold">
        <div>
          <span className="text-paragraph break-all font-bold">{row.name && row.name !== '' ? truncateText(row.name, 50) : '---'}</span>
        </div>
        <div>
          <span className="text-gray-700 break-all ">{row.categoryName && row.categoryName !== '' ? truncateText(row.categoryName, 100) : '---'}</span>
        </div>
      </div>
    </div>
  );
};
