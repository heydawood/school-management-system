import AnalyticsCard from '@/components/features/Dashboard/AnalyticsCard';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import WorkoutsTable from '@/components/features/Workouts/WorkoutsTable';
import WorkoutsTableFilters from '@/components/features/Workouts/WorkoutTableFilters';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { useWorkoutManager } from './WorkoutsManager';
import type { WorkoutLevels } from '@/Utils/Constants';

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

const statsKeyValue = [
  { title: 'Total Workout Listed', key: 'totalWorkouts' },
  { title: 'Beginner Workout Listed', key: 'beginnerWorkouts' },
  { title: 'Intermediate Workout Listed', key: 'intermediateWorkouts' },
  { title: 'Advanced Workout Listed', key: 'professionalWorkouts' },
];

const WorkoutsPage = () => {
  const { workouts, loading, categories, pagination, stats } = useAppSelector((state) => state.workouts);
  const [filters, setFilters] = useState<{ category: number | null; level: WorkoutLevels | null; search: string }>({ category: null, level: null, search: '' });
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleGetWorkoutList } = useWorkoutManager();

  const onFiltersChange = (filters: { category: number; level: WorkoutLevels | null; search: string }) => {
    setFilters(filters);
    handleGetWorkoutList({ page: 1, limit: pagination.limit, category: filters.category, level: filters.level, search: filters.search });
  };

  useEffect(() => {
    handleGetWorkoutList({ page: 1, limit: 10, category: null, level: null, search: '' });
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4">
        {statsKeyValue.map((item) => (
          <AnalyticsCard key={item.key} loading={loading} title={item.title} value={stats[item.key as keyof typeof stats] as any} change="0%" date="Aug 30, 2025" />
        ))}
      </div>
      <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
        <Header
          title="All Workouts"
          ActionButtons={
            <div className="flex gap-3 items-center">
              <WorkoutsTableFilters onChange={(filters) => onFiltersChange(filters)} categories={categories} />
              <Button onClick={() => navigate('/dashboard/workouts/create')} className="bg-primary rounded-xl px-5 py-5" type="button">
                <Icon icon="/icons/add-circle.svg" className="mr-2 text-white" />
                Add Workout
              </Button>
            </div>
          }
          onChange={(e: any) => {}}
          logo={<Icon icon="/icons/dumbell.svg" className="text-primary-800" />}
          logoClasses="bg-primary-25"
        />
        <WorkoutsTable loading={loading} filters={filters} workouts={workouts} pagination={pagination} />
      </div>
    </div>
  );
};

export default WorkoutsPage;
