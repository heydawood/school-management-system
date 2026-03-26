import { Badge } from '@/components/ui/badge';
import * as ColumnFormatters from './ColumnFormatters/ColumnFormatters';
import Table from '@/components/ui/table/Table';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { getTierBadge } from '@/pages/Dashboard/UsersManagement/Utils';
import { useNavigate } from 'react-router-dom';
import type { Pagination } from '@/Utils/Types';
import { useAppDispatch } from '@/Redux/Hooks';
import type { GetPaymentTypes } from '@/pages/Dashboard/Payments/Types';
import { getPaymentsPaginatedList } from '@/Redux/Payments/Slice';
import { getPaymentStatusBadge } from '@/pages/Dashboard/Payments/Utils';
import { truncateText } from '@/Utils/Helpers';
const PaymentTable: FC<{ loading: boolean; payments: GetPaymentTypes[]; pagination: Pagination }> = ({ payments, pagination, loading }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const paymentListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: GetPaymentTypes) => ColumnFormatters.NameFormatter(record?.user),
    },

    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      sorter: (a: any, b: any) => {
        const planA = a?.plan || 0;
        const planB = b?.plan || 0;
        return planA - planB;
      },
      render: (_: any, record: GetPaymentTypes) => <span className="text-paragraph">{truncateText(record.planName, 50) ?? 'N/A'}</span>,
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      sorter: (a: any, b: any) => {
        const lastActiveA = a?.lastActive || 0;
        const lastActiveB = b?.lastActive || 0;
        return lastActiveA - lastActiveB;
      },
      render: (_: any, record: GetPaymentTypes) => <span className="text-paragraph">{record.transactionId ?? 'N/A'}</span>,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      sorter: (a: any, b: any) => {
        const lastActiveA = a?.lastActive || 0;
        const lastActiveB = b?.lastActive || 0;
        return lastActiveA - lastActiveB;
      },
      render: (_: any, record: GetPaymentTypes) => <span className="text-paragraph">${record.paidAmount ?? 'N/A'}</span>,
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
      render: (_: any, record: GetPaymentTypes) => (
        <Badge className={`text-center shadow-none rounded-full ${getPaymentStatusBadge(record.paymentStatus == 'PAID' ? 'PAID' : 'FAILED')}`}>
          {record.paymentStatus == 'PAID' ? 'PAID' : 'FAILED'}
        </Badge>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_: any, record: GetPaymentTypes) => (
        <div>
          <Button
            onClick={() => {
              navigate(`/dashboard/payments/${record.userPaymentId}`);
            }}
            variant={'link'}
            className="text-primary-800 font-semibold"
          >
            View Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={paymentListColumns}
        dataSource={payments}
        rowKey="id"
        headerStyle="bg-neutral-400 rounded-xl"
        pagination={{
          totalItems: +pagination.total,
          totalPages: +pagination.totalPages,
          itemCount: payments.length,
          itemsPerPage: +pagination.limit,
          currentPage: +pagination.page,
          setitemsPerPage: (val: number) => {
            dispatch(getPaymentsPaginatedList({ page: pagination.page, limit: val }));
          },
          onPageChange: (page: number) => {
            dispatch(getPaymentsPaginatedList({ page, limit: pagination.limit }));
          },
        }}
      />
    </div>
  );
};

export default PaymentTable;
