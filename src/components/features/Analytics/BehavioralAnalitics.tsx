import StatChartCard from '@/components/features/Dashboard/StatChartCard';
import { analyticsPageData, FeatureEngagementTabs, FeatureEngagementTabsTypes } from '@/pages/Dashboard/Analytics/Utils';
import TrendLineChart from '@/components/Charts/TrendLineChart';
import ColoredBarChart from '@/components/Charts/ColoredBarChart';
import ColoredLineChart from '@/components/Charts/ColoredLineChart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getBehavioralAnalytics, getFeatureEngagements } from '@/Redux/Analytics/Slice';
import type { BehavioralAnalyticsResponse, FeatureEngagement } from '@/pages/Dashboard/Analytics/Types';
import { format } from 'date-fns';
import Loader from '@/components/ui/loader/Loader';
const BehavioralAnalitics = () => {
  const [analytics, setAnalytics] = useState<BehavioralAnalyticsResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleGetAnalytics = async () => {
    setLoading(true);
    dispatch(getBehavioralAnalytics())
      .unwrap() // this is used to direcly get the response or error from the thunk without having to check the action type
      .then((res: BehavioralAnalyticsResponse) => {
        setAnalytics(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetFeatureEngagements = async (type: string) => {
    dispatch(getFeatureEngagements(type))
      .unwrap()
      .then((res: FeatureEngagement[]) => {
        setAnalytics((prev) => ({ ...prev, featureEngagements: res } as BehavioralAnalyticsResponse));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetAnalytics();
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {loading && <Loader />}
      
      {/* Daily Exercise */}
      <div>
        <StatChartCard date={analyticsPageData?.dailyexercise?.date} icon={analyticsPageData.dailyexercise.icon} title={analyticsPageData.dailyexercise.title}>
          <div className="h-[250px] mt-2">
            <TrendLineChart
              data={analytics?.completedExercises?.map((item) => ({ name: format(new Date(item.date), 'eee'), Completed: item.count })) ?? [{ name: 'Mon', Completed: 0 }]}
              dataKey="Completed"
              color={analyticsPageData.dailyexercise.color}
            />
          </div>
        </StatChartCard>
      </div>
      <div>
        {/* Age Fall Risk */}
        <StatChartCard date={analyticsPageData?.streakLength?.date} icon={analyticsPageData.streakLength.icon} title={analyticsPageData.streakLength.title}>
          <div className="h-[250px] mt-2">
            <ColoredBarChart
              data={analyticsPageData.streakLength.data}
              bars={[{ dataKey: 'uv', color: '#30B795', showLabel: true }]}
              height={250}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </StatChartCard>
      </div>

      {/* Drop off funnel */}
      <div>
        <StatChartCard
          iconBg="bg-primary-25"
          iconTextColor="text-primary-800"
          date={analyticsPageData?.dropOff?.date}
          icon={analyticsPageData.dropOff.icon}
          title={analyticsPageData.dropOff.title}
        >
          <div className="h-[250px] mt-2">
            <ColoredBarChart
              data={analytics?.userDropOffs?.map((item) => ({ name: item.type, Count: item.dropOffCount })) ?? [{ name: 'Unknown', Count: 0 }]}
              bars={[{ dataKey: 'Count', color: '#30B795', showLabel: true }]}
              height={250}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </StatChartCard>
      </div>

      <div>
        {/* Feature Engagement */}
        <StatChartCard date={analyticsPageData?.featureEngagement?.date} icon={analyticsPageData.featureEngagement.icon} title={analyticsPageData.featureEngagement.title}>
          <Tabs defaultValue={FeatureEngagementTabsTypes.Workouts} onValueChange={(val) => handleGetFeatureEngagements(val)} className="w-full h-full col-span-12 py-3">
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {FeatureEngagementTabs.map((tab) => (
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
              data={
                analytics?.featureEngagements?.map((el, i) => ({ name: format(new Date(el.dropOffDate), 'MMM, dd'), Users: el.dropOffCount, date: el.dropOffDate })) ?? [
                  { name: 'Jan', Users: 0, date: 'Jan, 01' },
                ]
              }
              dataKey="Users"
              color={analyticsPageData.featureEngagement.color}
            />
          </div>
        </StatChartCard>
      </div>
    </div>
  );
};

export default BehavioralAnalitics;
