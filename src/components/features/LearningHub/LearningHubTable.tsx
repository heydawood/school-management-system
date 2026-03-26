import { Badge } from '@/components/ui/badge';
import Table from '@/components/ui/table/Table';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Pagination } from '@/Utils/Types';
import { getCategoryStatusBadge } from '@/pages/Dashboard/Categories/Utils';
import * as routes from '@/routes/Index';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import type { LearningHubResponse } from '@/pages/Dashboard/LearningHub/Types';

const LearningHubTable: FC<{
  loading: boolean;
  dietPlans: LearningHubResponse[];
  pagination: Pagination;
  filters: { search: string };
}> = ({ dietPlans, pagination, loading, filters }) => {
  const navigate = useNavigate();
  const { handleGetLearningHub } = useLearningHubActionManager();

  const LearningHubListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: LearningHubResponse, b: LearningHubResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: LearningHubResponse) => (
        <div className="flex items-center">
          <span className="text-paragraph overflow-hidden">{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a: LearningHubResponse, b: LearningHubResponse) => {
        const descA = a?.description?.toLowerCase() || '';
        const descB = b?.description?.toLowerCase() || '';
        return descA.localeCompare(descB);
      },
      render: (_: any, record: LearningHubResponse) => (
        <div className="flex items-center">
          <span className="text-paragraph overflow-hidden">{record.description}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: LearningHubResponse, b: LearningHubResponse) => {
        const statusA = a?.isActive ? 'Active' : 'Inactive';
        const statusB = b?.isActive ? 'Active' : 'Inactive';
        return statusA.localeCompare(statusB);
      },
      render: (_: any, record: LearningHubResponse) => (
        <Badge className={`text-center shadow-none rounded-full ${getCategoryStatusBadge(record.isActive)}`}>{record.isActive ? 'Active' : 'Inactive'}</Badge>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: LearningHubResponse) => (
        <div>
          <Button onClick={() => navigate(routes.LearningHubEdit(+record.dietPlanId))} variant="link" className="text-primary-800 font-semibold">
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
        columns={LearningHubListColumns}
        dataSource={dietPlans}
        rowKey="id"
        headerStyle="bg-neutral-400 rounded-xl"
        pagination={{
          totalItems: +pagination.total,
          totalPages: +pagination.totalPages,
          itemCount: dietPlans.length,
          itemsPerPage: +pagination.limit,
          currentPage: +pagination.page,
          setitemsPerPage: (val: number) => {
            handleGetLearningHub({ page: 1, limit: val });
          },
          onPageChange: (page: number) => {
            handleGetLearningHub({ page, limit: pagination.limit });
          },
        }}
      />
    </div>
  );
};

export default LearningHubTable;
