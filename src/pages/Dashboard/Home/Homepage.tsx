import ColoredBarChart from '@/components/Charts/ColoredBarChart';
import ColoredLineChart from '@/components/Charts/ColoredLineChart';
import TrendLineChart from '@/components/Charts/TrendLineChart';
import AnalyticsCard from '@/components/features/Dashboard/AnalyticsCard';
import HighRiskUsersList from '@/components/features/Dashboard/High-Risk/HighRiskUsersList';
import RecentFallUsersList from '@/components/features/Dashboard/Recent-Fall/RecentFallUsersList';
import StatChartCard from '@/components/features/Dashboard/StatChartCard';
import WorkoutCard from '@/components/features/Dashboard/WorkoutCard';
import AdminActionsModal from '@/components/Modals/AdminActionsModal';
import EmergencyAlertModal from '@/components/Modals/EmergencyAlertModal';
import UserActivityModal from '@/components/Modals/UserActivityModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAdminDashboard, getEmergencyAlerts, getSubscriptionStats, getUserGrowthStats } from '@/Redux/Home/Slice';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { homePageData } from '@/Utils/Data';
import { useEffect, useState } from 'react';
import { EmergencyAlertModalTabsTypes, LevelKeys, SubConversionTabs, SubConversionTabsTypes, UserGrowthTabs, UserGrowthTabsTypes } from './Utils';
import { formatTimeAgo, getDateRange } from '@/Utils/Helpers';
import { MapWithSearch } from '@/Common/Components/Map';
import { useNavigate } from 'react-router-dom';
import * as routes from '@/routes/Index';
import { format } from 'date-fns';

const statsKeyValue = [
  { title: 'Total Users Listed', key: 'allUsers', icon: '/icons/user-management.svg', isAmount: false },
  { title: 'Active Users Listed', key: 'activeUsers', icon: '/icons/users.svg', isAmount: false },
  { title: 'New Signups', key: 'last30DysUsers', icon: '/icons/mobile.svg', isAmount: false },
  { title: 'Total Revenue', key: 'totalRevenue', icon: '/icons/wallet.svg', isAmount: true },
];

const Homepage = () => {
  const [openEmergencyModal, setOpenEmergencyModal] = useState<boolean>(false);
  const [openLatestUsersModal, setOpenLatestUsersModal] = useState<boolean>(false);
  const [openAdminActionsModal, setOpenAdminActionsModal] = useState<boolean>(false);

  const { loading, data, stats, userAlerts } = useAppSelector((state) => state.homePage);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);
  return (
    <div>
      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {statsKeyValue.map((item) => (
          <AnalyticsCard
            key={item.key}
            loading={loading}
            isAmount={item.isAmount}
            icon={item.icon}
            title={item.title}
            value={stats[item.key as keyof typeof stats] as any}
            change="0%"
            date="Aug 30, 2025"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        
        {/* Growth Card */}
        <StatChartCard date={homePageData?.growth?.date} icon={homePageData.growth.icon} title={homePageData.growth.title}>
          <Tabs defaultValue={UserGrowthTabsTypes.Daily} onValueChange={(val) => dispatch(getUserGrowthStats(val))} className="w-full h-full col-span-12 py-3">
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {UserGrowthTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div>
            <ColoredLineChart
              gradientId="growthGradient"
              data={data?.userGrowth?.map((el, i) => ({ name: el.date, Users: el.users, date: el.date }))}
              dataKey="Users"
              color={homePageData.growth.color}
            />
          </div>
        </StatChartCard>

        {/* Subscription Card */}
        <StatChartCard date={homePageData?.subscription?.date} icon={homePageData.subscription.icon} title={homePageData.subscription.title}>
          <Tabs defaultValue={SubConversionTabsTypes.Free} onValueChange={(val) => dispatch(getSubscriptionStats(val))} className="w-full h-full col-span-12 py-3">
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {SubConversionTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div className="h-[250px] mt-2">
            <ColoredLineChart
              gradientId="subscriptionGradient"
              data={data?.subscriptionConversion?.map((el, i) => ({ name: el.date, Subscriptions: el.subscriptions, date: el.date }))}
              dataKey="Subscriptions"
              color={homePageData.subscription.color}
            />
          </div>
        </StatChartCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Features Card */}
        {/* <StatChartCard date={homePageData?.feature?.date} icon={homePageData.feature.icon} title={homePageData.feature.title}>
          <Tabs defaultValue={homePageData.feature.tabs[0].value} className="w-full h-full col-span-12 py-3">
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {homePageData.feature.tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div>
            <ColoredLineChart gradientId="featureGradient" data={homePageData.feature.data} color={homePageData.feature.color} />
          </div>
        </StatChartCard> */}

        {/* Age Group Card */}
        <StatChartCard date={homePageData?.ageGroup?.date} icon={homePageData.ageGroup.icon} title={homePageData.ageGroup.title}>
          <div className="h-[250px] mt-2">
            {' '}
            <ColoredLineChart
              gradientId="ageGroupGradient"
              data={data?.userAgeGroup?.map((el, i) => ({ name: el.age, Users: el.users, Age: el.age }))}
              dataKey="Users"
              color={homePageData.ageGroup.color}
            />
          </div>
        </StatChartCard>

        {/* Mobility Card */}
        <StatChartCard date={homePageData?.mobility?.date} icon={homePageData.mobility.icon} title={homePageData.mobility.title}>
          <div className="h-[250px] mt-2">
            {' '}
            <ColoredLineChart
              gradientId="mobilityGradient"
              data={data?.mobilityLevelDistribution?.map((el, i) => ({
                name: el.level,
                Completed: el.completed,
                level: el.level,
              }))}
              dataKey="Completed"
              color={homePageData.mobility.color}
            />
          </div>
        </StatChartCard>

        {/* Heatmap Card */}
        <StatChartCard date={homePageData?.heatmap?.date} icon={homePageData.heatmap.icon} title={homePageData.heatmap.title}>
          <div className="h-[250px] mt-2">
            <MapWithSearch
              key={JSON.stringify(data?.regionalHeatMap)}
              markers={data?.regionalHeatMap?.map((user) => ({ lat: parseFloat(user.latitude), lng: parseFloat(user.longitude), name: user.name, image: user.avatar }))}
              width="100%"
              height="250px"
              zoom={10}
            />
          </div>
        </StatChartCard>

        {/* Emergency Alert Card */}
        <StatChartCard
          actions={
            <Button onClick={() => setOpenEmergencyModal(true)} className="bg-primary-25 text-primary-800 hover:bg-primary-50 rounded-xl">
              View All
            </Button>
          }
          date={homePageData?.emergencyAlert?.date}
          icon={homePageData.emergencyAlert.icon}
          title={homePageData.emergencyAlert.title}
        >
          <Tabs
            defaultValue={homePageData.emergencyAlert.tabs[0].value}
            onValueChange={(val) => {
              dispatch(
                getEmergencyAlerts({
                  page: 1,
                  limit: 10,
                  startDate: getDateRange(val as EmergencyAlertModalTabsTypes).fromDate,
                  endDate: getDateRange(val as EmergencyAlertModalTabsTypes).toDate,
                }),
              );
            }}
            className="w-full h-full col-span-12 py-3"
          >
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {homePageData.emergencyAlert.tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div className="mt-2">
            <MapWithSearch
              key={JSON.stringify(data?.userAlerts)}
              markers={userAlerts?.map((user) => ({ lat: parseFloat(user.latitude), lng: parseFloat(user.longitude), name: user.name, image: user.avatar }))}
              width="100%"
              height="300px"
              zoom={10}
            />
          </div>
        </StatChartCard>

        {/* Latest User Activity Card */}
        <StatChartCard
          actions={
            <Button onClick={() => setOpenLatestUsersModal(true)} className="bg-primary-25 text-primary-800 hover:bg-primary-50 rounded-xl">
              View All
            </Button>
          }
          date={homePageData?.userActivities?.date}
          icon={homePageData.userActivities.icon}
          title={homePageData.userActivities.title}
        >
          <div className="mt-2">
            <div>
              <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid dark:after:bg-gray-400/20">
                {data?.userActivities?.map((activity, index) => (
                  <div key={index} className="grid gap-1 text-sm mb-6 relative">
                    <div className="aspect-square flex justify-center items-center w-4 bg-primary-25 rounded-full absolute left-0 translate-x-[-30.5px] z-10 top-1">
                      <div className="w-3 aspect-square rounded-full bg-primary-600" />
                    </div>

                    <div className="flex gap-4 justify-between">
                      <div className="flex gap-1 items-center">
                        {/* render html */}
                        <p dangerouslySetInnerHTML={{ __html: activity.content }} className="text-paragraph" />
                      </div>
                      <div className="text-gray-500 text-nowrap">{formatTimeAgo(activity.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StatChartCard>

        {/* Latest Admin Actions Card */}
        <StatChartCard
          actions={
            <Button onClick={() => setOpenAdminActionsModal(true)} className="bg-primary-25 text-primary-800 hover:bg-primary-50 rounded-xl">
              View All
            </Button>
          }
          date={homePageData?.adminActions?.date}
          icon={homePageData.adminActions.icon}
          title={homePageData.adminActions.title}
        >
          <div className="mt-2">
            <div>
              <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid dark:after:bg-gray-400/20">
                {data?.adminActivities?.map((activity, index) => (
                  <div key={index} className="grid gap-1 text-sm mb-6 relative">
                    <div className="aspect-square flex justify-center items-center w-4 bg-warning-100 rounded-full absolute left-0 translate-x-[-30.5px] z-10 top-1">
                      <div className="w-3 aspect-square rounded-full bg-warning-600" />
                    </div>

                    <div className="flex gap-4 justify-between">
                      <div className="flex gap-1 items-center">
                        {/* render html */}
                        <p dangerouslySetInnerHTML={{ __html: activity.content }} className="text-paragraph" />
                      </div>
                      <div className="text-gray-500 text-nowrap">{formatTimeAgo(activity.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StatChartCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* High Risk Users List */}
        <StatChartCard date={homePageData?.risk?.date} icon={homePageData.risk.icon} title={homePageData.risk.title}>
          <div className="mt-2">
            <HighRiskUsersList data={data.todayHighRisks} />
          </div>
        </StatChartCard>
        {/* Recent Fall Users List */}
        <StatChartCard date={homePageData?.recentFall?.date} icon={homePageData.recentFall.icon} title={homePageData.recentFall.title}>
          <div className="mt-2">
            <RecentFallUsersList data={data?.recentFallEvents} />
          </div>
        </StatChartCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Age Fall Risk */}
        <StatChartCard date={homePageData?.ageFallRisk?.date} icon={homePageData.ageFallRisk.icon} title={homePageData.ageFallRisk.title}>
          <div className="h-[250px] mt-2">
            <ColoredBarChart
              data={data?.ageWiseFallRiskScore?.map((item) => ({ name: item.age, Users: item.users }))}
              bars={[{ dataKey: 'Users', color: '#30B795', showLabel: true }]}
              yTicks={[0, 20, 40, 60, 80, 100]}
              height={250}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </StatChartCard>
        {/* Trend Chart Risk */}
        <StatChartCard date={homePageData?.trendChart?.date} icon={homePageData.trendChart.icon} title={homePageData.trendChart.title}>
          <div className="h-[250px] mt-2">
            <TrendLineChart
              data={data?.riskScoreMovement?.map((item) => ({ name: format(new Date(item.scoreDate), 'eee'), Users: item.users })) ?? [{ name: 'Mon', Users: 0 }]}
              dataKey="Users"
              color={homePageData.trendChart.color}
            />
          </div>
        </StatChartCard>
      </div>
      
      <div>
        {/* Workouts List */}
        <StatChartCard
          actions={
            <Button onClick={() => navigate(routes.WorkoutList())} className="bg-primary-25 text-primary-800 hover:bg-primary-50 rounded-xl">
              View Workout
            </Button>
          }
          date={homePageData?.popularWorkouts?.date}
          icon={homePageData.popularWorkouts.icon}
          title={homePageData.popularWorkouts.title}
        >
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
            {data?.mostPopularWorkouts?.map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
          </div>
        </StatChartCard>
      </div>

      {/* Modals */}
      {openEmergencyModal && <EmergencyAlertModal close={() => setOpenEmergencyModal(false)} />}
      {openLatestUsersModal && <UserActivityModal close={() => setOpenLatestUsersModal(false)} />}
      {openAdminActionsModal && <AdminActionsModal close={() => setOpenAdminActionsModal(false)} />}
    </div>
  );
};

export default Homepage;
