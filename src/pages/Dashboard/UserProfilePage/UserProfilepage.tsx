import StatChartCard from '@/components/features/Dashboard/StatChartCard';
import ProfileCard from '@/components/features/UserProfile/ProfileCard';
import { profileData } from './Utils';
import ColoredLineChart from '@/components/Charts/ColoredLineChart';
import SubscriptionHistoryTable from '@/components/features/UserProfile/SubscriptionHistory/SubscriptionHistoryTable';
import EmergencyLogsTable from '@/components/features/UserProfile/EmergencyLogs/EmergemcyLogsTable';
import ColoredBarChart from '@/components/Charts/ColoredBarChart';
import { useUserProfileManager } from './UserProfileManager';
import { useAppDispatch } from '@/Redux/Hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@/components/ui/loader/Loader';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { usePage } from '@/Providers/PageProvider';

interface CounterProps {
  current?: number;
  total?: number;
}

const Counter: React.FC<CounterProps> = ({ current, total }) => {
  // format current with leading zero
  const formatted = String(current).padStart(2, '0');

  return (
    <div className="text-2xl font-bold">
      <span>{formatted ?? '00'}</span>
      <span className="text-base  font-semibold">/{total}</span>
    </div>
  );
};

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="p-2 bg-neutral-200 hover:bg-neutral-300 text-black shadow-none" onClick={onClick}>
      <ChevronLeft size={20} />
    </Button>
  );
};

const UserProfilePage = () => {
  const { handleGetUserProfile, userProfile, loading, handleUpdateUserStatus } = useUserProfileManager();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const { pageInfo, setPageInfo } = usePage();

  useEffect(() => {
    handleGetUserProfile(id);
    setPageInfo({ title: 'User Profile', withBackButton: true, backButton: <BackButton onClick={() => navigate(-1)} /> });
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <ProfileCard onBlock={handleUpdateUserStatus} userProfile={userProfile} />
          <div className="mt-4">
            <StatChartCard iconBg="bg-error-25" iconTextColor="text-error-800" date={profileData?.dropOff?.date} icon={profileData.dropOff.icon} title={profileData.dropOff.title}>
              <div className="h-[250px] mt-2">
                <ColoredBarChart
                  data={userProfile?.userDropOff?.map((item) => ({ name: item.type, count: item.dropOffCount }))!}
                  bars={profileData?.dropOff?.bars}
                  yTicks={[0, 20, 40, 60, 80, 100]}
                  height={250}
                  showGrid={true}
                  showTooltip={true}
                />
              </div>
            </StatChartCard>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {/* Hydration Card */}
            <StatChartCard
              iconBg="bg-blue-50"
              iconTextColor="text-blue-500"
              date={profileData?.hydration?.date}
              icon={profileData.hydration.icon}
              title={profileData.hydration.title}
              actions={<Counter current={userProfile?.hydrationStats?.filter((item) => item.reachedTarget == 1).length} total={userProfile?.hydrationStats?.length} />}
            >
              <div className="h-[250px] mt-2">
                <ColoredLineChart
                  gradientId="hydrationGradient"
                  data={userProfile?.hydrationStats?.map((item) => ({ name: format(new Date(item.date), 'MMM dd'), Intake: item.intakeQty }))!}
                  dataKey="Intake"
                  color={profileData.hydration.color}
                  showTooltip={true}
                />
              </div>
            </StatChartCard>
            {/* Steps Card */}
            <StatChartCard
              actions={<Counter current={userProfile?.stepsStats?.filter((item) => item.reachedTarget == 1).length} total={userProfile?.stepsStats?.length} />}
              iconBg="bg-warning-25"
              iconTextColor="text-warning-800"
              date={profileData?.steps?.date}
              icon={profileData.steps.icon}
              title={profileData.steps.title}
            >
              <div className="h-[250px] mt-2">
                <ColoredLineChart
                  gradientId="stepsGradient"
                  data={userProfile?.stepsStats?.map((item) => ({ name: format(new Date(item.date), 'MMM dd'), Steps: item.steps }))!}
                  dataKey="Steps"
                  color={profileData.steps.color}
                />
              </div>
            </StatChartCard>
            {/* Workout Card */}
            <StatChartCard
              actions={<Counter current={userProfile?.workoutStats?.filter((item) => item.reachedTarget == 1).length} total={userProfile?.workoutStats?.length} />}
              date={profileData?.workout?.date}
              icon={profileData.workout.icon}
              title={profileData.workout.title}
            >
              <div className="h-[250px] mt-2">
                <ColoredLineChart
                  gradientId="workoutGradient"
                  data={userProfile?.workoutStats?.map((item) => ({ name: format(new Date(item.completeDate), 'MMM dd'), Workouts: item.count }))!}
                  dataKey="Workouts"
                  color={profileData.workout.color}
                />
              </div>
            </StatChartCard>
          </div>
          <div>
            <div className="mt-4">
              <StatChartCard withDate={false} date={'Aug 30, 2025'} icon={'/icons/tag.svg'} title={'Subscription History'}>
                <div className="mt-2">
                  <SubscriptionHistoryTable data={userProfile?.subscriptions} />
                </div>
              </StatChartCard>
            </div>
            <div className="mt-4">
              <StatChartCard
                iconBg="bg-error-25"
                iconTextColor="text-error-800"
                withDate={false}
                date={'Aug 30, 2025'}
                icon={'/icons/alert-icon.svg'}
                title={'Emergency Incident Log'}
              >
                <div className="mt-2">
                  <EmergencyLogsTable data={userProfile?.emergencyIncidents!} />
                </div>
              </StatChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
