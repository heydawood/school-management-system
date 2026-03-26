import React, { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import type { AdminDataResponse } from '@/pages/Dashboard/Admins/Types';
import type { LearningHubResponse } from '@/pages/Dashboard/LearningHub/Types';
import { Badge } from '@/components/ui/badge';
import { getCategoryStatusBadge } from '@/pages/Dashboard/Categories/Utils';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import AdminModal from '@/components/Modals/AdminModal';

const AdminTable: FC<{
    loading: boolean;
    data: AdminDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

  const [openAdminActionsModal, setOpenAdminActionsModal] = useState<boolean>(false);

  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);



    const navigate = useNavigate();
      const { handleGetLearningHub } = useLearningHubActionManager();

    const AdminListColumns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a: AdminDataResponse, b: AdminDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
            const nameA = a?.name?.toLowerCase() || '';
            const nameB = b?.name?.toLowerCase() || '';
            return nameA.localeCompare(nameB);
          },
          render: (_: any, record: AdminDataResponse) => (
            <div className="flex items-center">
              <span className="text-paragraph overflow-hidden">{record.name}</span>
            </div>
          ),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: (a: AdminDataResponse, b: AdminDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
            const nameA = a?.email?.toLowerCase() || '';
            const nameB = b?.email?.toLowerCase() || '';
            return nameA.localeCompare(nameB);
          },
          render: (_: any, record: AdminDataResponse) => (
            <div className="flex items-center">
              <span className="text-paragraph overflow-hidden">{record.email}</span>
            </div>
          ),
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          sorter: (a: AdminDataResponse, b: AdminDataResponse) => {
            const descA = a?.role?.toLowerCase() || '';
            const descB = b?.role?.toLowerCase() || '';
            return descA.localeCompare(descB);
          },
          render: (_: any, record: AdminDataResponse) => (
            <div className="flex items-center">
              <span className="text-paragraph overflow-hidden">{record.role}</span>
            </div>
          ),
        },
        // {
        //   title: 'Status',
        //   dataIndex: 'status',
        //   key: 'status',
        //   sorter: (a: LearningHubResponse, b: LearningHubResponse) => {
        //     const statusA = a?.isActive ? 'Active' : 'Inactive';
        //     const statusB = b?.isActive ? 'Active' : 'Inactive';
        //     return statusA.localeCompare(statusB);
        //   },
        //   render: (_: any, record: LearningHubResponse) => (
        //     <Badge className={`text-center shadow-none rounded-full ${getCategoryStatusBadge(record.isActive)}`}>{record.isActive ? 'Active' : 'Inactive'}</Badge>
        //   ),
        // },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_: any, record: AdminDataResponse) => (
            <div>
              <Button onClick={() => {

              
                setSelectedAdminId(record.id);
                setOpenAdminActionsModal(true)}} variant="link" className="text-primary-800 font-semibold">
                View
              </Button>
            </div>
          ),
        },
      ];

    return (
        <>
            <Table
                loading={loading}
                columns={AdminListColumns}
                dataSource={data}
                rowKey="id"
                headerStyle="bg-neutral-400 rounded-xl"
                pagination={{
                    totalItems: +pagination.total,
                    totalPages: +pagination.totalPages,
                    itemCount: data.length,
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


            {/* View Modal */}
            {openAdminActionsModal && <AdminModal adminId={selectedAdminId} close={() => setOpenAdminActionsModal(false)} />}
        </>
    )
}

export default AdminTable