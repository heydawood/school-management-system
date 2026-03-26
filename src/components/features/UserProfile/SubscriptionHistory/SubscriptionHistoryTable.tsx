'use client';
import type { FC } from 'react';
import Table from '@/components/ui/table/Table';
import { Badge } from '@/components/ui/badge';
import { getStatusBadge, getTierBadge } from '@/pages/Dashboard/UserProfilePage/Utils';
import type { UserSubscription } from '@/pages/Dashboard/UserProfilePage/Types';
import { format } from 'date-fns';
import { capitalizeFirstLetter } from '@/Utils/Helpers';

const SubscriptionHistoryTable: FC<{ data: UserSubscription[] | undefined }> = ({ data }) => {
  const subscriptionHistoryTableColumns = [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: any, b: any) => {
        const startDateA = new Date(a?.startDate) || 0;
        const startDateB = new Date(b?.startDate) || 0;
        return startDateA.getTime() - startDateB.getTime();
      },
      render: (_: any, record: UserSubscription) => (
        <div className="py-2">
          <span className="text-paragraph font-semibold">{record.subscriptionStartDate ? format(new Date(record.subscriptionStartDate), 'MMM dd, yyyy') : '-'}</span>
        </div>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a: any, b: any) => {
        const endDateA = new Date(a?.endDate) || 0;
        const endDateB = new Date(b?.endDate) || 0;
        return endDateA.getTime() - endDateB.getTime();
      },
      render: (_: any, record: UserSubscription) => (
        <span className="text-paragraph font-semibold">{record.subscriptionEndDate ? format(new Date(record.subscriptionEndDate), 'MMM dd, yyyy') : '-'}</span>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      sorter: (a: any, b: any) => {
        const planA = a?.plan?.toLowerCase() || '';
        const planB = b?.plan?.toLowerCase() || '';
        return planA.localeCompare(planB);
      },
      render: (_: any, record: UserSubscription) => <span className="text-paragraph font-semibold">{record.nameEn}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: any, b: any) => {
        const statusA = a?.status || 0;
        const statusB = b?.status || 0;
        return statusA - statusB;
      },
      render: (_: any, record: UserSubscription) => (
        <Badge className={`text-center shadow-none rounded-full ${getStatusBadge(record.status)}`}>{capitalizeFirstLetter(record.status)}</Badge>
      ),
    },
  ];

  return (
    <div>
      <Table columns={subscriptionHistoryTableColumns} dataSource={data ?? []} rowKey="id" headerStyle="bg-neutral-500 rounded-xl" />
    </div>
  );
};

export default SubscriptionHistoryTable;
