import { Avatar, AvatarImage } from '@/components/ui/avatar';
import type { Workout } from '@/pages/Dashboard/Workouts/Types';

export const NameFormatter = (row: Workout) => {
  return (
    <div className="flex gap-5 py-2 items-center">
      <div className="text-sm font-semibold">
        <div>
          <span className="text-paragraph font-bold text-wrap">{row.name && row.name !== '' ? row.name : '---'}</span>
        </div>
        <div>
          <span className="text-gray-700 text-nowrap">{row.categoryName && row.categoryName !== '' ? row.categoryName : '---'}</span>
        </div>
      </div>
    </div>
  );
};
