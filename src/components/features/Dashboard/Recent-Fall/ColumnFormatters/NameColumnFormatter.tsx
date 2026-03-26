import { Avatar, AvatarImage } from '@/components/ui/avatar';

export const NameFormatter = (row: any) => {
  return (
    <div className="flex gap-5 py-2 items-center">
      <Avatar className="rounded-full">
        <AvatarImage src={row.avatar ?? '/images/user-default.png'} alt="user" className="object-cover" />
      </Avatar>
      <div className="text-sm font-semibold">
        <span>{row.name}</span>
      </div>
    </div>
  );
};
