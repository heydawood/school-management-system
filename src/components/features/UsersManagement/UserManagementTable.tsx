import { Badge } from '@/components/ui/badge';
import * as ColumnFormatters from './ColumnFormatters/ColumnFormatters';
import Table from '@/components/ui/table/Table';
import type { FC } from 'react';
import type { UserManagementUser } from '@/pages/Dashboard/UsersManagement/Types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { getRoleBadge, getStatusBadge, getTierBadge } from '@/pages/Dashboard/UsersManagement/Utils';
import { useNavigate, useParams } from 'react-router-dom';
import type { Pagination } from '@/Utils/Types';
import { useAppDispatch } from '@/Redux/Hooks';
import { getUserManagementPaginatedList } from '@/Redux/UserManagement/Slice';
import * as routes from '@/routes/Index';
const UserManagementTable: FC<{ loading: boolean; users: UserManagementUser[]; pagination: Pagination }> = ({ users, pagination, loading }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userManagementListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: UserManagementUser) => ColumnFormatters.NameFormatter(record),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) => {
        const emailA = a?.email?.toLowerCase() || '';
        const emailB = b?.email?.toLowerCase() || '';
        return emailA.localeCompare(emailB);
      },
      render: (_: any, record: UserManagementUser) => <span className="text-paragraph">{record.email ?? '--'}</span>,
    },
    {
      title: 'Recent Drop off',
      dataIndex: 'recentDropOff',
      key: 'recentDropOff',
      sorter: (a: any, b: any) => {
        const nameA = a?.recentDropOff?.toLowerCase() || '';
        const nameB = b?.recentDropOff?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: UserManagementUser) => <span className="text-paragraph">{record?.recentDropOff?.length > 0 ? record.recentDropOff : '--'}</span>,
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
      render: (_: any, record: UserManagementUser) => <span className="text-paragraph font-semibold">{record.plan}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      sorter: (a: UserManagementUser, b: UserManagementUser) => {
        const statusA = a.isActive ? 1 : 0;
        const statusB = b.isActive ? 1 : 0;
        return statusA - statusB;
      },
      render: (_: any, record: UserManagementUser) => (
        <Badge className={`text-center shadow-none rounded-full ${getStatusBadge(record.isActive)}`}>{record.isActive ? 'Active' : 'Inactive'}</Badge>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'role',
      key: 'role',
      sorter: (a: any, b: any) => {
        const roleA = a?.role?.toLowerCase() || '';
        const roleB = b?.role?.toLowerCase() || '';
        return roleA.localeCompare(roleB);
      },
      render: (_: any, record: UserManagementUser) => <Badge className={`text-center shadow-none rounded-full ${getRoleBadge(record.role)}`}>{record.role}</Badge>,
    },

    {
      title: 'Last Active',
      dataIndex: 'lastActivity',
      key: 'lastActive',
      sorter: (a: UserManagementUser, b: UserManagementUser) => {
        const dateA = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
        const dateB = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
        return dateA - dateB;
      },
      render: (_: any, record: UserManagementUser) => <span className="text-paragraph">{record.lastActivity ? format(new Date(record.lastActivity), 'MMM dd, yyyy') : '---'}</span>,
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_: any, record: UserManagementUser) => (
        <div>
          <Button
            onClick={() => {
              navigate(routes.UserProfile(+record.userId));
            }}
            variant={'link'}
            className="text-primary-800 font-semibold"
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={userManagementListColumns}
        dataSource={users}
        rowKey="id"
        headerStyle="bg-neutral-400 rounded-xl"
        pagination={{
          totalItems: +pagination.total,
          totalPages: +pagination.totalPages,
          itemCount: users.length,
          itemsPerPage: +pagination.limit,
          currentPage: +pagination.page,
          setitemsPerPage: (val: number) => {
            dispatch(getUserManagementPaginatedList({ page: 1, limit: val }));
          },
          onPageChange: (page: number) => {
            dispatch(getUserManagementPaginatedList({ page, limit: pagination.limit }));
          },
        }}
      />
    </div>
  );
};

export default UserManagementTable;
