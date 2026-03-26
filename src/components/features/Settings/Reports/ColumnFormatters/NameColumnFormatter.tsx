import { Avatar, AvatarImage } from '@/components/ui/avatar';
import type { UserSupportQuestion } from '@/pages/Dashboard/Settings/Types';

export const NameFormatter = (row: UserSupportQuestion) => {
  return (
    <div className="flex gap-5 py-2 items-center">
      <Avatar className="rounded-full h-8 w-8">
        <AvatarImage src={row?.userAvatar ? row?.userAvatar : '/images/user-default.png'} alt="user" className="object-cover" />
      </Avatar>
      <div className="text-sm font-semibold">
        <div>
          <span className="text-paragraph font-bold text-nowrap">{row?.userName && row?.userName !== '' ? row?.userName : '---'}</span>
        </div>
        <div>
          <span className="text-gray-700 text-nowrap">{row?.userPhoneNo && row?.userPhoneNo !== '' ? row?.userPhoneNo : '---'}</span>
        </div>
      </div>
    </div>
  );
};
