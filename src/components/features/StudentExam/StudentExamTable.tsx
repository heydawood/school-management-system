import React, { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import type { StudentExamDataResponse } from '@/pages/Dashboard/StudentPanel/StudentExam/Types';

const StudentExamTable: FC<{
  loading: boolean;
  data: StudentExamDataResponse[];
  pagination: Pagination;
  filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {


  const navigate = useNavigate();
  const { handleGetLearningHub } = useLearningHubActionManager();

  const StudentExamColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: StudentExamDataResponse, b: StudentExamDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
        const nameA = a?.exam?.name?.toLowerCase() || '';
        const nameB = b?.exam?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: StudentExamDataResponse) => (
        <div className="flex items-center">
          <span className="text-paragraph overflow-hidden">{record.exam?.name}</span>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'examDate',
      key: 'examDate',
      sorter: (a: StudentExamDataResponse, b: StudentExamDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
        const nameA = a?.exam?.examDate?.toLowerCase() || '';
        const nameB = b?.exam?.examDate?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: StudentExamDataResponse) => (
        <div className="flex items-center">
          <span className="text-paragraph overflow-hidden">{new Date(record.exam?.examDate).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a: StudentExamDataResponse, b: StudentExamDataResponse) => {
        const descA = a?.exam?.duration?.toLowerCase() || '';
        const descB = b?.exam?.duration?.toLowerCase() || '';
        return descA.localeCompare(descB);
      },
      render: (_: any, record: StudentExamDataResponse) => (
        <div className="flex items-center">
          <span className="text-paragraph overflow-hidden">{record.exam?.duration}</span>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: StudentExamDataResponse) => {


        const examId = record.exam?.id;

        if (record.attemptStatus === "completed") {
          return (
            <Button
                variant="link"
                className="text-primary-800 font-semibold"
                onClick={() =>
                  navigate(`/dashboard/student/exams/${examId}/review`)
                }
              >
                Review Answers
              </Button>
          );
        }

        if (record.attemptStatus === "in-progress") {
          return (
            <Button
            variant="link" 
            className="text-green-600 font-semibold"
              onClick={() =>
                navigate(`/dashboard/student/exams/${examId}`)
              }
            >
              Resume
            </Button>
          );
          

        }

        return (
          <Button
          variant="link" 
            className="text-green-600 font-semibold"
            onClick={() =>
              navigate(`/dashboard/student/exams/${examId}`)
            }
          >
            Start
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        columns={StudentExamColumns}
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
    </>
  )
}

export default StudentExamTable
