import React, { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import type { ExamsDataResponse } from '@/pages/Dashboard/TeacherPanel/Exams/Types';
import ExamsModal from '@/components/Modals/ExamsModal';

const ExamsTable: FC<{
  loading: boolean;
  data: ExamsDataResponse[];
  pagination: Pagination;
  filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

  const [openExamsActionsModal, setOpenExamsActionsModal] = useState<boolean>(false);

  const [selectedExamsId, setSelectedExamsId] = useState<string | null>(null);



  const navigate = useNavigate();
  const { handleGetLearningHub } = useLearningHubActionManager();

  const ExamsListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ExamsDataResponse, b: ExamsDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: ExamsDataResponse) => (
        <div className="flex items-center">
          <span className="text-paragraph overflow-hidden">{record.name}</span>
        </div>
      ),
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a: ExamsDataResponse, b: ExamsDataResponse) => {
        const descA = a?.description?.toLowerCase() || '';
        const descB = b?.description?.toLowerCase() || '';
        return descA.localeCompare(descB);
      },
      render: (_: any, record: ExamsDataResponse) => (
        <div className="flex items-center">
          <span className="text-paragraph overflow-hidden">{record.description}</span>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: ExamsDataResponse) => (
        <div>
          <Button onClick={() => {


            setSelectedExamsId(record.id);
            setOpenExamsActionsModal(true)
          }} variant="link" className="text-primary-800 font-semibold">
            View
          </Button>

          <Button
            onClick={() => navigate(`/dashboard/teacher/exams/${record.id}/questions/create`)}
            variant="link" 
            className="text-green-600 font-semibold"
          >
            Add Question
          </Button>

        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        columns={ExamsListColumns}
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
      {openExamsActionsModal && <ExamsModal examId={selectedExamsId} close={() => setOpenExamsActionsModal(false)} />}
    </>
  )
}

export default ExamsTable