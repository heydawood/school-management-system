import { useCustomAlert } from '@/Common/Components/CustomAlert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import type { UserProfileResponse } from '@/pages/Dashboard/UserProfilePage/Types';
import { getStatusBadge } from '@/pages/Dashboard/UserProfilePage/Utils';
import { capitalizeFirstLetter } from '@/Utils/Helpers';
import type { FC } from 'react';

interface ProfileCardProps {
  userProfile: UserProfileResponse | null;
  onBlock: (id: number) => void;
}

const KeyValueSet: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between mt-4">
    <span className="text-paragraph ">{label} &nbsp;:</span>
    <span className=" text-paragraph font-bold">{value}</span>
  </div>
);

const ProfileCard = ({ userProfile, onBlock }: ProfileCardProps) => {
  const showAlert = useCustomAlert();
  const blockUser = (id: number) => {
    showAlert({
      title: 'Block User',
      description: 'Are you sure you want to block this user?\nBlocked users will no longer be able to book classes, join chats, or receive gym announcements.',
      confirmText: 'Yes',
      cancelText: 'No',
      customLogo: <Icon icon="/icons/user-block.svg" />,
      logoClasses: 'bg-error-100 text-error',
      onConfirm: () => {
        onBlock(id);
      },
      classNames: {
        confirmButton: 'hover:bg-error bg-error-25 text-error-800 hover:text-white rounded-xl',
        cancelButton: 'border border-neutral-975 bg-transparent hover:bg-primary hover:border-primary hover:text-white rounded-xl',
      },
    });
  };

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <div>
            <Badge className={`${getStatusBadge(userProfile?.isActive ? 'Active' : 'Inactive')} flex gap-2 w-fit shadow-none rounded-full`}>
              <span className={`h-2 w-2 ${userProfile?.isActive ? 'bg-primary-800' : 'bg-error-800'} rounded-full`} /> {userProfile?.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Avatar className="rounded-full border-4 border-neutral-975 h-[120px] w-[120px]">
              <AvatarImage src={userProfile?.avatar ?? '/images/user-default.png'} alt="user" className="object-cover" />
            </Avatar>
            <div className="text-center mt-4">
              <h3 className="text-heading">{userProfile?.name}</h3>
              <p className="text-paragraph text-gray-25">{userProfile?.email}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <KeyValueSet label="User Segment" value={String(userProfile?.userSegment ?? 'NA')} />
          <KeyValueSet label="Country" value={String(userProfile?.country ?? 'NA')} />
          {/* <KeyValueSet label="Country" value={String(userProfile?.country ?? 'NA')} /> */}
          <KeyValueSet label="Age" value={String(userProfile?.age ?? 'NA')} />
          <KeyValueSet label="Gender" value={String(userProfile?.gender ?? 'NA')} />
          <KeyValueSet label="Height" value={String(userProfile?.height ?? 'NA')} />
          <KeyValueSet label="Weight" value={String(userProfile?.weight ?? 'NA')} />
          <KeyValueSet label="Account Plan" value={userProfile?.accountPlan ? capitalizeFirstLetter(userProfile?.accountPlan!) : 'NA'} />

          <Separator className="my-4" />

          <div className="flex flex-wrap justify-between gap-4">
            <Button className="bg-primary-25 text-primary-800 rounded-xl hover:bg-primary hover:text-white grow">Export Data</Button>
            {userProfile?.isActive ? (
              <Button onClick={() => blockUser(userProfile?.userId!)} className="bg-error-25 text-error-800 rounded-xl hover:bg-error hover:text-white grow">
                Block User
              </Button>
            ) : (
              <Button onClick={() => onBlock(userProfile?.userId!)} className="bg-error-25 text-error-800 rounded-xl hover:bg-error hover:text-white grow">
                Unblock User
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
