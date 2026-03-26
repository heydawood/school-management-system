import UserManagementTable from '@/components/features/UsersManagement/UserManagementTable';
import AnalyticsCard from '@/components/features/Dashboard/AnalyticsCard';
import { useEffect, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import UMTableFilters from '@/components/features/UsersManagement/UMTableFilters';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { exportUsers, getUserManagementList, getUserManagementPaginatedList } from '@/Redux/UserManagement/Slice';
import { useUserManager } from './UsersManager';

const statsKeyValue = [
  { title: 'Free Users Listed', key: 'freeUsersCount' },
  { title: 'Trial Users Listed', key: 'trialUsersCount' },
  { title: 'Waiting Users Listed', key: 'waitingUsersCount' },
  { title: 'Paid Users Listed', key: 'paidUsersCount' },
  { title: 'Listed Care Givers', key: 'careGiverCount' },
];

const Header = ({
  onChange,
  ActionButtons,
  logo,
  logoClasses,
  title,
}: {
  onChange: (e: any) => void;
  ActionButtons?: ReactNode;
  logo: ReactNode;
  logoClasses: string;
  title: string;
}) => (
  <div className="flex gap-4 justify-between items-center flex-wrap pb-4 mb-4 border-b border-neutral-975">
    <div className="flex items-center gap-3">
      <div className={`h-12 w-12 flex justify-center items-center rounded-full ${logoClasses}`}>{logo}</div>
      <h3 className="text-heading">{title}</h3>
    </div>
    {ActionButtons}
  </div>
);

const UsersManagement = () => {
  const { users, loading, statsLoading, pagination, stats } = useAppSelector((state) => state.userManagement);

  const dispatch = useAppDispatch();
  const { filters, handleFetchFilters } = useUserManager();

  const handleExportUsers = () => {
    dispatch(exportUsers())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob.payload], { type: 'text/csv' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchFilters();
    dispatch(getUserManagementList({ page: 1, limit: 10 }));
  }, [dispatch]);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {statsKeyValue.map((item) => (
          <AnalyticsCard key={item.key} loading={statsLoading} title={item.title} value={stats[item.key as keyof typeof stats] as any} change="0%" date="Aug 30, 2025" />
        ))}
      </div>
      <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
        <Header
          title="All Users"
          ActionButtons={
            <div className="flex gap-3 items-center">
              <UMTableFilters
                onChange={(filters) => {
                  dispatch(getUserManagementPaginatedList({ ...filters, page: 1, limit: 10 }));
                }}
                filters={filters}
              />
              <Button onClick={handleExportUsers} className="bg-primary-25 text-primary-800 rounded-xl px-5 py-5" type="button">
                Export CSV
              </Button>
            </div>
          }
          onChange={(e: any) => {}}
          logo={<Icon icon="/icons/user-management.svg" className="text-primary-800" />}
          logoClasses="bg-primary-25"
        />
        <UserManagementTable loading={loading} users={users} pagination={pagination} />
      </div>
    </div>
  );
};

export default UsersManagement;
