import ValueSkeleton from '@/Common/Components/ValueSkeleton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { FC } from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  icon?: string;
  title: string;
  value: string;
  change: string;
  date?: string;
  loading?: boolean;
  isAmount?: boolean;
}

const AnalyticsCard: FC<Props> = ({ icon, title, value, change, date, loading = false, isAmount = false }) => {
  return (
    <div className="border-2 rounded-xl p-3 border-neutral-975">
      <div className="flex gap-2 items-center mb-3">
        {icon && (
          <Avatar className="rounded-full bg-primary-25 flex justify-center items-center">
            <SVG
              src={icon}
              // src="/icons/wallet.svg"
              className="text-primary-800"
              preProcessor={(code) => {
                return code.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
              }}
            />
          </Avatar>
        )}
        <h2 className="text-subheading">{title}</h2>
      </div>
      <div className="flex justify-between items-center">
        {loading ? (
          <ValueSkeleton />
        ) : (
          <h2 className="text-heading">
            {isAmount ? '$' : ''} {value}
          </h2>
        )}
        <Badge className="text-primary-800 bg-primary-25 rounded-full">{change}</Badge>
      </div>

      {/* {date && (
        <>
          <Separator className="my-2" /> <p className="text-paragraph text-gray-25">Update: {date}</p>{' '}
        </>
      )} */}
    </div>
  );
};

export default AnalyticsCard;
