import { Badge } from '@/components/ui/badge';
import Table from '@/components/ui/table/Table';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Pagination } from '@/Utils/Types';
import type { Categories } from '@/pages/Dashboard/Categories/Types';
import { getCategoryStatusBadge } from '@/pages/Dashboard/Categories/Utils';
import { useCategoryManager } from '@/pages/Dashboard/Categories/CategoryManager';
import * as routes from '@/routes/Index';
const CategoryTable: FC<{
  loading: boolean;
  categories: Categories[];
  pagination: Pagination;
  filters: { search: string };
}> = ({ categories, pagination, loading, filters }) => {
  const navigate = useNavigate();

  const { handleGetPaginatedCategories } = useCategoryManager();

  const categoryListColumns = [
    {
      title: 'Name & Category',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => {
        const nameA = a?.nameEn?.toLowerCase() || '';
        const nameB = b?.nameEn?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: Categories) => (
        <div className="flex w-1/2 items-center">
          <span className="text-paragraph overflow-hidden">{record.nameEn}</span>
        </div>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: any, b: any) => {
        const statusA = a?.status || '';
        const statusB = b?.status || '';
        return statusA.localeCompare(statusB);
      },
      render: (_: any, record: Categories) => (
        <Badge className={`text-center shadow-none rounded-full ${getCategoryStatusBadge(record.isActive)}`}>{record.isActive ? 'Active' : 'Inactive'}</Badge>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_: any, record: Categories) => (
        <div>
          <Button onClick={() => navigate(routes.CategoryEdit(+record.workoutCategoryId))} variant={'link'} className="text-primary-800 font-semibold">
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
        columns={categoryListColumns}
        dataSource={categories}
        rowKey="id"
        headerStyle="bg-neutral-400 rounded-xl"
        pagination={{
          totalItems: +pagination.total,
          totalPages: +pagination.totalPages,
          itemCount: categories.length,
          itemsPerPage: +pagination.limit,
          currentPage: +pagination.page,
          setitemsPerPage: (val: number) => {
            handleGetPaginatedCategories({ isPaginated: true, page: 1, limit: val, search: filters.search });
          },
          onPageChange: (page: number) => {
            handleGetPaginatedCategories({ isPaginated: true, page, limit: pagination.limit, search: filters.search });
          },
        }}
      />
    </div>
  );
};

export default CategoryTable;
