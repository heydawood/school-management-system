import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { MostPopularWorkout } from '@/pages/Dashboard/Home/Types';
import { type FC } from 'react';

const WorkoutCard: FC<{ workout: MostPopularWorkout }> = ({ workout }) => {
  return (
    <div className="border border-neutral-975 rounded-xl overflow-hidden flex gap-2 items-center p-4">
      <Avatar className="rounded-xl h-12 bg-neutral-975 w-12">
        <AvatarImage src={workout.image} alt="user" className="object-cover bg-neutral-975" />
      </Avatar>
      <div className="flex justify-between grow">
        <div className="flex flex-col">
          <h2 className="text-subheading">{workout.title}</h2>
          <p className="text-paragraph text-gray-25">{workout.level}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-sm text-gray-25">Total Competitions</span>
          <Badge className="bg-primary-25 text-primary-800 rounded-full">{workout.totalCount ?? 0} this month</Badge>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
