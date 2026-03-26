import { Badge } from '@/components/ui/badge';
import * as ColumnFormatters from './ColumnFormatters/ColumnFormatters';
import Table from '@/components/ui/table/Table';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { Pagination } from '@/Utils/Types';
import { useAppDispatch } from '@/Redux/Hooks';
import { getDifficultyBadge, getStatusBadge } from '@/pages/Dashboard/Workouts/Utils';
import type { Workout } from '@/pages/Dashboard/Workouts/Types';
import { useWorkoutManager } from '@/pages/Dashboard/Workouts/WorkoutsManager';
import type { WorkoutLevels } from '@/Utils/Constants';
const WorkoutsTable: FC<{ loading: boolean; workouts: Workout[]; pagination: Pagination; filters: { category: number | null; level: WorkoutLevels | null; search: string } }> = ({
  workouts,
  pagination,
  loading,
  filters,
}) => {
  const navigate = useNavigate();

  const { handleGetWorkoutList } = useWorkoutManager();

  const workoutsListColumns = [
    {
      title: 'Name & Category',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: Workout) => ColumnFormatters.NameFormatter(record),
    },
    {
      title: 'Listed Exercises',
      dataIndex: 'listedExercises',
      key: 'listedExercises',
      sorter: (a: any, b: any) => {
        const listedExercisesA = a?.listedExercises || 0;
        const listedExercisesB = b?.listedExercises || 0;
        return listedExercisesA - listedExercisesB;
      },
      render: (_: any, record: Workout) => <span className="text-paragraph">{record.listedExercises}</span>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a: any, b: any) => {
        const durationA = a?.duration || 0;
        const durationB = b?.duration || 0;
        return durationA - durationB;
      },
      render: (_: any, record: Workout) => <span className="text-paragraph">{record.duration}</span>,
    },
    {
      title: 'Users Performed',
      dataIndex: 'usersPerformed',
      key: 'usersPerformed',
      sorter: (a: any, b: any) => {
        const usersPerformedA = a?.usersPerformed || 0;
        const usersPerformedB = b?.usersPerformed || 0;
        return usersPerformedA - usersPerformedB;
      },
      render: (_: any, record: Workout) => <span className="text-paragraph">{record.userPerformed}</span>,
    },
    {
      title: 'Time Spent',
      dataIndex: 'timeSpent',
      key: 'timeSpent',
      sorter: (a: any, b: any) => {
        const timeA = a?.timeSpent || 0;
        const timeB = b?.timeSpent || 0;
        return timeA - timeB;
      },
      render: (_: any, record: Workout) => <span className="text-paragraph">{record.timeSpent}</span>,
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      sorter: (a: any, b: any) => {
        const difficultyA = a?.difficulty || '';
        const difficultyB = b?.difficulty || '';
        return difficultyA.localeCompare(difficultyB);
      },
      render: (_: any, record: Workout) => <Badge className={`text-center shadow-none rounded-full ${getDifficultyBadge(record.difficulty)}`}>{record.difficulty}</Badge>,
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
      render: (_: any, record: Workout) => <Badge className={`text-center shadow-none rounded-full ${getStatusBadge(record.status)}`}>{record.status}</Badge>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_: any, record: Workout) => (
        <div>
          <Button onClick={() => navigate(`/dashboard/workouts/${record.workoutId}`)} variant={'link'} className="text-primary-800 font-semibold">
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
        columns={workoutsListColumns}
        dataSource={workouts}
        rowKey="id"
        headerStyle="bg-neutral-400 rounded-xl"
        pagination={{
          totalItems: +pagination.total,
          totalPages: +pagination.totalPages,
          itemCount: workouts.length,
          itemsPerPage: +pagination.limit,
          currentPage: +pagination.page,
          setitemsPerPage: (val: number) => {
            handleGetWorkoutList({ page: 1, limit: val, category: filters.category, level: filters.level, search: filters.search });
          },
          onPageChange: (page: number) => {
            handleGetWorkoutList({ page, limit: pagination.limit, category: filters.category, level: filters.level, search: filters.search });
          },
        }}
      />
    </div>
  );
};

export default WorkoutsTable;
