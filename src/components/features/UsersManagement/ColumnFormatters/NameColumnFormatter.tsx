import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { truncateText } from '@/Utils/Helpers';

export const NameFormatter = (row: any) => {
  return (
    <div className="flex gap-5 w-[200px] py-2 items-center">
      <Avatar className="rounded-full h-8 w-8">
        <AvatarImage src={row.avatar ? row.avatar : '/images/user-default.png'} alt="user" className="object-cover" />
      </Avatar>
      <div className="text-sm font-semibold">
        <div>
          <span className="text-paragraph font-bold text-nowrap">{row.name && row.name !== '' ? truncateText(row.name, 40) : '---'}</span>
        </div>
        <div>
          <span className="text-gray-700 text-nowrap">{row.phone && row.phone !== '' ? row.phone : '---'}</span>
        </div>
      </div>
    </div>
  );
};
