import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Fragment, type FC } from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  icon: string;
  title: string;
  date: string;
  withDate?: boolean;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  iconBg?: string;
  iconTextColor?: string;
}

const StatChartCard: FC<Props> = ({ withDate = true, icon, title, date, actions, children, iconBg, iconTextColor }) => {
  return (
    <div className="border-2 relative rounded-xl h-full p-3 border-neutral-975">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center">
          <Avatar className={`rounded-full ${iconBg ? iconBg : 'bg-primary-25'} flex justify-center items-center`}>
            <SVG
              src={icon}
              className={iconTextColor ? iconTextColor : 'text-primary-800'}
              preProcessor={(code) => {
                return code.replaceAll(/fill=".*?"/g, 'fill="currentColor"');
              }}
            />
          </Avatar>
          <h2 className="text-subheading">{title}</h2>
        </div>
        <div>{actions}</div>
      </div>
      <Separator className="mt-3" />
      <div className="mb-10">{children}</div>
      {/* {withDate && (
        <div className="absolute bottom-3 left-3 right-3">
          <Separator className="my-3" />
          <p className="text-paragraph text-gray-25">Update: {date}</p>
        </div>
      )} */}
    </div>
  );
};

export default StatChartCard;
